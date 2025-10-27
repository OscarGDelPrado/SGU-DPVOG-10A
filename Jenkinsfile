
pipeline {
    agent any

    stages {

        // Del recurso SCM configurado en el job, jala el repo (checkout)
        stage('Obteniendo actualización...') {
            steps {
                // Descarga el código fuente del repositorio Git
                checkout scm
            }
        }

        // Construir y levantar los servicios
        stage('Construyendo y Desplegando Servicios...') {
            steps {
                bat '''
                    docker compose -p sgu-dpvog-10a up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito'
        }

        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }

        always {
            echo 'Pipeline finalizado'
        }
    }
}