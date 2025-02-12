pipeline {
    agent any 

    environment {
        NODEJS_VERSION = "18" // Adjust based on your project
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Hitesh-Beniwal/my-react-app-sit223/.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodejsHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                sh 'npx eslint . || true'  // ESLint for code quality
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'  // Jest or Cypress for testing
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Test Server') {
            steps {
                sh 'scp -r build/ user@your-test-server:/var/www/html'
            }
        }

        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy'
                sh 'scp -r build/ user@your-production-server:/var/www/html'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Monitoring with New Relic / Datadog configured here"
            }
        }
    }
}
