const oracledb = require("oracledb");

// Connection parameters
const scrt = {
  user: "apps",
  password: "devapps",
  host: "ec2-52-2-62-212.compute-1.amazonaws.com",
  port: "1521",
  dbname: "ebs_DEV", // e.g., 'localhost/XE' for local database
};

const dbConfig = {
  user: scrt?.user,
  password: scrt?.password,
  connectString: scrt?.host + ":" + scrt?.port + "/" + scrt?.dbname,
  connectTimeout: 27000, // Set the connection timeout to 5 seconds (adjust as needed)
  poolTimeout: 60000,
};

// Function to connect to the Oracle DB
async function connectToDB() {
  try {
    let connection;
    // Establish connection
    // await oracledb.initOracleClient({
    //   libDir: "C:\\instantclient_21_9",
    // });
    connection = await oracledb.getConnection(dbConfig);
    console.log("Connected to Oracle Database");

    // Execute your queries here
    // For example:
    const result = await connection.execute(
      `select * from fnd_user where user_name=upper('MSURENDT')`
    );
    console.log("Query Result:", result.rows);

    // Close the connection
    await connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error occurred:", err);
  }
}

// Call the function to connect to the database
connectToDB();
