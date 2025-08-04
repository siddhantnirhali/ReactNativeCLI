pipeline {
    agent {
        docker {
            image 'node:20'  // or node:20
            args '-u root:root' // optional if permission issues
        }
    }

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the app (dry run)...'
                sh 'npx react-native --version'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests (if any)...'
                sh 'echo "No tests defined yet"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
