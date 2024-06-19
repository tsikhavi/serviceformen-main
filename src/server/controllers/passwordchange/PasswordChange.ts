import * as bcrypt from "bcryptjs";
import 'dotenv/config';
import mysql from "mysql2";

const saltRounds = 10; // Adjust salt rounds as needed
const connectionPool = require("../../../connectionPool"); // Import your MySQL connection pool

const changePassword = async (request, response) => {
  try {
    const { login, currentPassword, newPassword } = request.body.params;

    // Fetch user data from database
    const sql = "SELECT * FROM profiles WHERE login = ?";
    const query = mysql.format(sql, [login]);
    connectionPool.query(query, async (error, data) => {
      if (error) {
        return response.status(500).json({
          success: false,
          message: "Error fetching user data",
          error: error,
        });
      }

      // Check if user exists
      const user = data[0];
      if (!user) {
        return response.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify current password
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return response.status(401).json({
          success: false,
          message: "Incorrect current password",
        });
      }

      // Hash and update new password
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      const updateSql = "UPDATE profiles SET password = ? WHERE login = ?";
      const updateQuery = mysql.format(updateSql, [hashedNewPassword, login]);
      connectionPool.query(updateQuery, (updateError) => {
        if (updateError) {
          return response.status(500).json({
            success: false,
            message: "Error updating password",
            error: updateError,
          });
        }

        return response.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      });
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

export default changePassword;
