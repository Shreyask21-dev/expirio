import mysql from 'mysql2/promise'

export async function GET(request) {

    console.log(request.method)

    const dbconfig = {
        host:'localhost',
        user:'root',
        password:'',
        database:'expirio'
    }

    let connection

    try{
        connection = await mysql.createConnection(dbconfig)

        const [rows] = await connection.execute("SELECT * FROM `clients`");

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });

    } catch (error){
        console.error('Database connection error:', error);

        return new Response(
            JSON.stringify({ error: 'Failed to connect to the database' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }finally {
        if (connection) {
            // Close the connection
            await connection.end();
        }
    }

}


export async function POST(request) {
    console.log(request.method);

    const dbconfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'expirio',

        // host: '157.173.216.182',
        // user: 'u350066759_subscribe',
        // password: 'Coinage@141224',
        // database: 'u350066759_subscoin',
    };

    let connection;
 
    try {
        // Parse the incoming JSON body
        const requestBody = await request.json();

        // Extract the necessary fields from the request body
        const { name, company, phone, email, description   } = requestBody;

        // Validate input data (you can customize validation as per your requirements)
        if (!name || !company || !phone || !email || !description) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Create a new database connection
        connection = await mysql.createConnection(dbconfig);

        // Define the INSERT query to insert the new domain record into the database
        const query = `
            INSERT INTO clients (name, company, phone, email, description) 
            VALUES (?, ?, ?, ? , ?)`;

        // Execute the INSERT query with the values
        const [result] = await connection.execute(query, [
            name,
            company,
            phone,
            email,
            description,
        ]);

        // Respond with a success message and the inserted record's ID
        return new Response(
            JSON.stringify({
                message: 'Domain successfully added',
                insertedId: result.insertId,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Database insertion error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to insert domain record' }),
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


export async function DELETE(request) {
    console.log(request.method);

    const dbconfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'expirio',
    };

    let connection;

    try {
        // Parse the incoming request for the ID
        const url = new URL(request.url);
        const id = url.searchParams.get('id'); // Assuming the ID is passed as a query parameter

        // Validate the ID
        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Missing required id parameter' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Create a new database connection
        connection = await mysql.createConnection(dbconfig);

        // Define the DELETE query to remove the record from the database
        const query = `DELETE FROM clients WHERE \`sr no\` = ?`;

        // Execute the DELETE query with the ID
        const [result] = await connection.execute(query, [id]);

        // Check if any rows were affected (deleted)
        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: 'No record found with the provided id' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Respond with a success message
        return new Response(
            JSON.stringify({
                message: 'Record successfully deleted',
                deletedId: id,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Database deletion error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete record' }),
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


export async function PUT(request) {
    console.log(request.method);

    const dbconfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'expirio',
    };

    let connection;

    try {
        // Parse the incoming JSON body
        const requestBody = await request.json();

        // Extract the necessary fields from the request body
        const { id, name, company, phone, email, description } = requestBody;

        // Validate input data
        if (!id || !name || !company || !phone || !email || !description ) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Create a new database connection
        connection = await mysql.createConnection(dbconfig);

        // Define the UPDATE query to update the record in the database
        const query = `
            UPDATE clients
            SET name = ?, company = ?, phone = ?, email = ?, description = ?
            WHERE \`sr no\` = ?`;

        // Execute the UPDATE query with the values
        const [result] = await connection.execute(query, [
            name,
            company,
            phone,
            email,
            description,
            id,
        ]);

        // Check if any rows were affected (updated)
        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: 'No record found with the provided id' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Respond with a success message
        return new Response(
            JSON.stringify({
                message: 'Record successfully updated',
                updatedId: id,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Database update error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update record' }),
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