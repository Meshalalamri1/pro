const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://meshal:Meshal2009@cluster0.ebduv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
    try {
        const client = new MongoClient(uri, {
            serverApi: ServerApiVersion.v1,
            connectTimeoutMS: 30000, // وقت أطول لمحاولة الاتصال
            socketTimeoutMS: 45000,  // تجنب قطع الاتصال بسرعة
            tls: true // التأكد من استخدام TLS
        });

        await client.connect();
        console.log("✅ الاتصال ناجح!");
        await client.close();
    } catch (err) {
        console.error("❌ فشل الاتصال:", err);
    }
}

testConnection();
