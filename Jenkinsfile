pipeline {
    agent any

    environment {
        DEPLOY_USER = 'gon'
        DEPLOY_HOST = '172.31.253.98'
        DEPLOY_PATH = '/var/www/react-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: '468aceec-2418-40f6-939e-9cd09038f26a',
                    url: 'https://github.com/EPISANTE/FrontEnd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'GonVM',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'dist/**/*',
                                    removePrefix: 'dist/',
                                    remoteDirectory: "${DEPLOY_PATH}",
                                    execCommand: ''
                                )
                            ],
                            usePty: false,
                            continueOnError: false,
                            failOnError: true
                        )
                    ]
                )
            }
        }
    }
      triggers {
        githubPush()
    }
}