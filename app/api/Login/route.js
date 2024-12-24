import mysql from 'mysql2/promise'; // Ensure you're using mysql2 for async/await support.

export async function POST(request) {
    console.log(request.method);

    const dbconfig = {
        host: '157.173.216.182',
        user: 'u350066759_subscribe',
        password: 'Coinage@141224',
        database: 'u350066759_subscoin',
    };

    let connection;

    try {
        // Parse the incoming JSON body
        const requestBody = await request.json();

        // Extract email and password from the request body
        const { email, password } = requestBody;

        // Validate input data
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Missing email or password' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Create a new database connection
        connection = await mysql.createConnection(dbconfig);

        // Define the SELECT query to check for user credentials
        const query = `SELECT * FROM users WHERE email = ?`;

        // Execute the query with the provided email
        const [rows] = await connection.execute(query, [email]);

        if (rows.length === 0) {
            // No user found with the given email
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const user = rows[0];

        // Check if the provided password matches the one in the database
        if (user.password !== password) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // If credentials are valid, return a success response
        return new Response(
            JSON.stringify({
                message: 'Login successful',
                email: user.email, // Include the user's email in the response
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to authenticate user' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        if (connection) {
            // Close the connection to the database
            await connection.end();
        }
    }
}
