pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/siddhantnirhali/ReactNativeCLI.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                // e.g., run your build script or command here
                sh './build.sh'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // e.g., run test command
                sh './run-tests.sh'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Deploy script or Docker image push, etc.
            }
        }
    }
}
