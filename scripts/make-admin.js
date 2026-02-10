require("dotenv").config();
const { Client } = require("pg");

const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/make-admin.js user@example.com");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing in your environment.");
  process.exit(1);
}

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const res = await client.query(
    "update users set role = $1, status = $2 where email = $3 returning id, email, role, status",
    ["ADMIN", "APPROVED", email]
  );

  if (res.rows.length === 0) {
    console.error("No user found for email:", email);
    process.exitCode = 1;
  } else {
    console.log(res.rows[0]);
  }

  await client.end();
})().catch((error) => {
  console.error("Failed to promote admin:", error);
  process.exit(1);
});
