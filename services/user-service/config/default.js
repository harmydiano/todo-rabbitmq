require('dotenv').config();
const PORT = process.env.PORT || 3010;
module.exports = {
    app: {
        appName: process.env.APP_NAME || 'App Name',
        environment: process.env.NODE_ENV || 'dev',
        superSecret: process.env.SERVER_SECRET || 'ipa-BUhBOJAm',
        baseUrl: `http://localhost:${PORT}`,
        siteUrl: `http://127.0.0.1:${PORT}/api/v1/`,
        port: PORT,
        domain: process.env.APP_DOMAIN || 'app.com',
        email_encryption: process.env.EMAIL_ENCRYPTION || false,
        verify_redirect_url: `${process.env.BASE_URL}/verify`,
    },
    auth: {
        email_encryption: false,
        encryption_key: process.env.SERVER_SECRET || 'appSecret',
        expiresIn: 3600 * 124 * 100,
    },
    api: {
        lang: 'en',
        prefix: '^/api/v[1-9]',
        resource: '^/resources/[a-zA-Z-]+',
        versions: [1],
        patch_version: '1.0.0',
        pagination: {
            itemsPerPage: 100
        }
    },
    databases: {
        mongodb: {
            url: process.env.DB_URL,
            test: process.env.DB_TEST_URL,
        }
    },
    queue : {
        name : "users"
    },
    email: {
        nodemailer: {
            from: 'noreply@ses.yaply.network'
        }
    },
    aws: {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
            params: { Bucket: 'vwcompany' },
        },
        bucket: process.env.AWS_BUCKET,
        s3Link: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/`,
    },
    options: {
        errors: {
            wrap: { label: '' }
        }
    }
};