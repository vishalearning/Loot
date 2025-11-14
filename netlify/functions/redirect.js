
export async function handler(event, context) {
  try {
    const MAX_WHATSAPP = 4;

    const encodedLinks = [
      "aHR0cHM6Ly93YS5tZS85MTc4Nzk4NTAxNzY=",
      "aHR0cHM6Ly93YS5tZS85MTk1MDgxMTU4MDM=",
      "aHR0cHM6Ly93YS5tZS85MTYyODAzNzM5MTQ=",
      "aHR0cHM6Ly93YS5tZS85MTc2MjUwMzQ1NzQ=",
      "aHR0cHM6Ly93YS5tZS85MTgzMDk2MjQ2NTM=",
      "aHR0cHM6Ly93YS5tZS85MTg3Nzg5MTQ1Nzc=",
      "aHR0cHM6Ly93YS5tZS85MTg4ODgyODg3NjE=",
      "aHR0cHM6Ly93YS5tZS85MTkzNzM2NDMxODM=",
      "aHR0cHM6Ly93YS5tZS85MTg3OTMyODQ0MjU=",
      "aHR0cHM6Ly93YS5tZS85MTkzNTk0MTI3NTQ=",
      "aHR0cHM6Ly93YS5tZS85MTkzMjI2NTAyNDI=",
      "aHR0cHM6Ly93YS5tZS85MTkzMDEyOTkyNjI=",
      "aHR0cHM6Ly93YS5tZS85MTgxMjU3NjMzMDE=",
      "aHR0cHM6Ly93YS5tZS85MTcwNTY1NDg1MzY=",
      "aHR0cHM6Ly93YS5tZS85MTczOTY3NzE3OTI=",
      "aHR0cHM6Ly93YS5tZS85MTgxNDczNDUzOTg=",
      "aHR0cHM6Ly93YS5tZS85MTk2MjI2ODk5NDE=",
      "aHR0cHM6Ly93YS5tZS85MTgwODg2OTgzMjk=",
      "aHR0cHM6Ly90Lm1lLytSbS1kZ0dlNnVfcGpPR0Ux"
    ];

    const decoded = encodedLinks.map(l => Buffer.from(l, "base64").toString("utf8").trim());
    const telegram = decoded.find(l => l.includes("t.me"));
    const whatsapps = decoded.filter(l => l.includes("wa.me"));

    const cookie = event.headers.cookie || "";
    let count = 0;
    const match = cookie.match(/shown=(\d+)/);
    if (match) count = parseInt(match[1]);

    if (count >= MAX_WHATSAPP) {
      return {
        statusCode: 302,
        headers: {
          Location: telegram,
          "Set-Cookie": "shown=0; Path=/;"
        }
      };
    }

    const randomWA = whatsapps[Math.floor(Math.random() * whatsapps.length)];

    return {
      statusCode: 302,
      headers: {
        Location: randomWA,
        "Set-Cookie": `shown=${count + 1}; Path=/;`
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error"
    };
  }
}
