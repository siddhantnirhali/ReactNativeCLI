pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/siddhantnirhali/ReactNativeCLI.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the app (dry run)...'
                // For example, just checking if Metro can start without errors
                sh 'npx react-native --version'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests (if any)...'
                // Replace with your actual test command if present
                sh 'echo "No tests defined yet"'
            }
        }
    }
}
