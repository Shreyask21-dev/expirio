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

        const [rows] = await connection.execute("SELECT `sr no`, `name` , `phone`,`email`,`service`,`description`, DATE_FORMAT(`sDate`, '%d-%m-%Y') AS `sDate`, DATE_FORMAT(`eDate`, '%d-%m-%Y') AS `eDate` FROM domains;");

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

// export async function POST(request) {

//     console.log(request.method)

//     // INSERT INTO `domains` (`sr no`, `name`, `phone`, `email`, `domain`, `sDate`, `eDate`) VALUES (NULL, 'shreyas', '8530136842', 'shreyas@gmail.com', 'shreyas.com', '2023-01-01', '2024-01-01');


//     return new Response(JSON.stringify({ message: 'Hello, World! as post' }), {
//         status: 200,
//         headers: {
//         'Content-Type': 'application/json',
//         },
//     });
    
// }


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
        const { name, phone, email, service, description , sDate, eDate } = requestBody;

        // Validate input data (you can customize validation as per your requirements)
        if (!name || !phone || !email || !service || !description || !sDate || !eDate) {
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
            INSERT INTO domains (name, phone, email, service, description, sDate, eDate) 
            VALUES (?, ?, ?,? , ?, ?, ?)`;

        // Execute the INSERT query with the values
        const [result] = await connection.execute(query, [
            name,
            phone,
            email,
            service,
            description,
            sDate,
            eDate,
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