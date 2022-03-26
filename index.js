const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log("Connecting to server...");
  await page.goto(
    "http://172.27.16.250:8002/index.php?zone=iiitdmj&redirurl=http%3A%2F%2Fwww.gstatic.com%2Fgenerate_204",
    {
      waitUntil: "networkidle0",
      timeout: 30000,
    }
  );
  try {
    console.log("Logging in...");
    await page.waitForSelector("input[name=auth_user]", { timeout: 5000 });
    await page.type("input[name=auth_user]", process.env.LOGIN_ID);
    await page.waitForSelector("input[name=auth_pass]", { timeout: 5000 });
    await page.type("input[name=auth_pass]", process.env.LOGIN_PASS);
    await page.click("input[type=submit");
    await page.waitForTimeout(1000);
    console.log("Logged in successfully.");
  } catch (error) {
    console.log("Already logged in or broken connection...");
  }
  await browser.close();
})();
