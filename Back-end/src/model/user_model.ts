import { type } from "os";
import Client from "../database";
import bcrypt from "bcrypt";
import { Error } from "../utlities/error_response";
import { Checker_Class } from "../utlities/checker";

const error = new Error();
const checker = new Checker_Class();

export type Add_User_Type = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  responsibility: string;
  status?: string;
};

const { BCRYPT_PASSWORD } = process.env;

// Class Contain all User Function
export class User_Class {
  // Connect to database and send user data
  async addUser(newUser: Add_User_Type) {
    try {
      if (
        newUser.firstName != undefined &&
        newUser.lastName != undefined &&
        newUser.email != undefined &&
        newUser.password != undefined &&
        newUser.responsibility != undefined
      ) {
        // Var to hold boolen value to determine if user exist or not
        let found;
        // Exist User id
        let idFromUser;
        // take value from emailExist function
        const emailDBResponse = await checker.accountExist(newUser.email);
        if (emailDBResponse.rows.length === 0) {
          found = false;
        } else {
          found = true;
          idFromUser = emailDBResponse.rows[0].id;
        }
        // if data not found in database add user
        if (found == false) {
          const hash = checker.hashPass(newUser.password);
          const conn = await Client.connect();
          const insertUserSql =
            "INSERT INTO user_shop(first_name,last_name,email,password,responsibility,status,restrictions,jwt) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,status";
          const result = await conn.query(insertUserSql, [
            newUser.firstName,
            newUser.lastName,
            newUser.email,
            hash,
            newUser.responsibility,
            `Pending`,
            `Nothing`,
            null,
          ]);
          conn.release();
          return {
            response_msg:
              "The registration process was successful, please activate your account.",
            error: false,
            status: result.rows[0].status,
            id: result.rows[0].id,
          };
        } else {
          return {
            response_msg: "This email is already in our database.",
            error: true,
            status: emailDBResponse.rows[0].status,
            id: idFromUser,
          };
        }
      } else {
        return error.error_400;
      }
    } catch {
      return error.error_400;
    }
  }

  // Convert acc account statues form Pending to Active
  async activeUser(id: number) {
    try {
      if (id != undefined) {
        await checker.checkID(id);
        const sqlActiveAcc =
          "UPDATE user_shop SET status='Active' WHERE id=($1)";
        const conn = await Client.connect();
        await conn.query(sqlActiveAcc, [id]).then((res) => {});
        conn.release();
        return {
          error: false,
          response_msg: "Your account has been activated",
        };
      } else {
        return error.error_400;
      }
    } catch (err) {
      return error.error_404;
    }
  }

  // auth user account
  async auth(email: string, password: string) {
    try {
      if (email == undefined || password == undefined) {
        return error.error_400;
      } else {
        const sqlAuth =
          "SELECT id,email,password FROM user_shop WHERE email=($1) AND status=($2) AND restrictions=($3)";
        const conn = await Client.connect();
        const result = await conn.query(sqlAuth, [email, "Active", "Nothing"]);
        conn.release();
        if (result.rows.length > 0) {
          const user = result.rows[0];
          if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
            return user;
          }
        }
        return error.error_404;
      }
    } catch {
      return error.error_400;
    }
  }

  // Set temporary token in database "1 hour"
  async settocken(token: string, email: string) {
    try {
      if (token != undefined && email != undefined) {
        const sqltoken = "UPDATE user_shop SET jwt=($1) WHERE email=($2)";
        const conn = await Client.connect();
        await conn.query(sqltoken, [token, email]);
        conn.release();
        setTimeout(async () => {
          const conn = await Client.connect();
          await conn.query(sqltoken, [null, email]);
          conn.release();
        }, 3600000);
      } else {
        return error.error_400;
      }
    } catch {
      return error.error_400;
    }
  }

  // Set unique id for user to handel forget password request
  async setUniqueID(unid: string, email: string) {
    try {
      if (unid != undefined && email != undefined) {
        let found;
        // take value from emailExist function
        await checker.accountExist(email).then(function (res) {
          if (JSON.parse(JSON.stringify(res)).rows.length !== 0) {
            found = true;
          } else {
            found = false;
          }
        });
        if (found == true) {
          const sqlSetUniqueID =
            "UPDATE user_shop SET unid=($1) WHERE email=($2)";
          const conn = await Client.connect();
          await conn.query(sqlSetUniqueID, [unid, email]);
          conn.release();
          // 20 min
          setTimeout(async () => {
            const conn = await Client.connect();
            await conn.query(sqlSetUniqueID, [null, email]);
            conn.release();
          }, 1200000);
          return {
            response_msg:
              "The password update code has been added to the database.",
            error: false,
          };
        } else {
          return error.error_404;
        }
      } else {
        return error.error_400;
      }
    } catch {
      return error.error_400;
    }
  }

  // Change user password in database
  async ChangePassword(uniq: string, newpassword: string) {
    try {
      if (uniq != undefined && newpassword != undefined) {
        const hash = checker.hashPass(newpassword);
        const sqlChangePass =
          "UPDATE user_shop SET password=($1),unid=('') WHERE unid=($2) RETURNING id";
        const conn = await Client.connect();
        const result = await conn.query(sqlChangePass, [hash, uniq]);
        conn.release();
        if (result.rows.length === 0) {
          return error.error_404;
        } else {
          return {
            error: false,
            response_msg: "Password has been updated.",
          };
        }
      } else {
        return error.error_400;
      }
    } catch {
      return error.error_400;
    }
  }
}
