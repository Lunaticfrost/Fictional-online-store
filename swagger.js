const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/authRoutes.js','./routes/cartRoutes.js','./routes/itemRoutes.js','./routes/orderRoutes.js','./routes/searchRoutes.js']

swaggerAutogen(outputFile, endpointsFiles)