import mysql from 'mysql2/promise';

export async function GET(request) {
    console.log(request.method);

    const dbconfig = {
        host: '157.173.216.182',
        user: 'u350066759_subscribe',
        password: 'Coinage@141224',
        database: 'u350066759_subscoin'
    };

    let connection;

    try {
        connection = await mysql.createConnection(dbconfig);

        const [rows] = await connection.execute(
            "SELECT `sr no`, `name`, `phone`, `email`, `service`, `description`, `renewal_amt`, DATE_FORMAT(`sDate`, '%d-%m-%Y') AS `sDate`, DATE_FORMAT(`eDate`, '%d-%m-%Y') AS `eDate`, DATE_FORMAT(`eDate`, '%M %Y') AS `eDate_Month` FROM domains ORDER BY YEAR(`eDate`) ASC, MONTH(`eDate`) ASC, `eDate` ASC;"
        );

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
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
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export async function POST(request) {
    console.log(request.method);

    const dbconfig = {
        host: '157.173.216.182',
        user: 'u350066759_subscribe',
        password: 'Coinage@141224',
        database: 'u350066759_subscoin'
    };

    let connection;

    try {
        const requestBody = await request.json();

        const { name, phone, email, service, description, renewal_amt, sDate, eDate } = requestBody;

        if (!name || !phone || !email || !service || !description || !renewal_amt || !sDate || !eDate) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        connection = await mysql.createConnection(dbconfig);

        const query = `
            INSERT INTO domains (name, phone, email, service, description, renewal_amt, sDate, eDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await connection.execute(query, [
            name,
            phone,
            email,
            service,
            description,
            renewal_amt,
            sDate,
            eDate,
        ]);

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
            await connection.end();
        }
    }
}

export async function DELETE(request) {
    console.log(request.method);

    const dbconfig = {
        host: '157.173.216.182',
        user: 'u350066759_subscribe',
        password: 'Coinage@141224',
        database: 'u350066759_subscoin'
    };

    let connection;

    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return new Response(
                JSON.stringify({ error: 'Missing required id parameter' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        connection = await mysql.createConnection(dbconfig);

        const query = `DELETE FROM domains WHERE \`sr no\` = ?`;

        const [result] = await connection.execute(query, [id]);

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: 'No record found with the provided id' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

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
            await connection.end();
        }
    }
}

export async function PUT(request) {
    console.log(request.method);

    const dbconfig = {
        host: '157.173.216.182',
        user: 'u350066759_subscribe',
        password: 'Coinage@141224',
        database: 'u350066759_subscoin'
    };

    let connection;

    try {
        const requestBody = await request.json();

        const { 'sr no': id, name, phone, email, service, description, renewal_amt, sDate, eDate } = requestBody;

        if (!id || !name || !phone || !email || !service || !description || !renewal_amt || !sDate || !eDate) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        connection = await mysql.createConnection(dbconfig);

        const query = `
            UPDATE domains
            SET name = ?, phone = ?, email = ?, service = ?, description = ?, renewal_amt = ?, sDate = ?, eDate = ?
            WHERE \`sr no\` = ?`;

        const [result] = await connection.execute(query, [
            name,
            phone,
            email,
            service,
            description,
            renewal_amt,
            sDate,
            eDate,
            id,
        ]);

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: 'No record found with the provided id' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

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
            await connection.end();
        }
    }
}
