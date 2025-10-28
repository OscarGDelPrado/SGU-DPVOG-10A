pipeline {
    agent any

    stages {
        // Parar y limpiar completamente los recursos del proyecto anterior.
        stage('Limpieza Profunda de Proyecto') {
            steps {
                bat '''
                    REM Parar y eliminar contenedores, redes y volumenes del compose.
                    docker compose -p sgu-dpvog-10a down -v --remove-orphans || exit /b 0

                    REM Eliminar forzadamente contenedores por nombre para evitar conflictos.
                    docker rm -f sgu-database || exit /b 0
                    docker rm -f sgu-backend || exit /b 0
                    docker rm -f sgu-frontend || exit /b 0
                '''
            }
        }

        // Eliminar las imágenes creadas por ese proyecto
        stage('Eliminando imágenes anteriores...') {
            steps {
                bat '''
                    set "images_found="
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=sgu-dpvog-10a" -q') do (
                        docker rmi -f %%i
                        set "images_found=true"
                    )

                    if defined images_found (
                        echo Imagenes eliminadas correctamente
                    ) else (
                        echo No hay imagenes por eliminar
                    )
                '''
            }
        }

        // Del recurso SCM configurado en el job, jala el repo
        stage('Obteniendo actualización...') {
            steps {
                checkout scm
            }
        }

        // Construir y levantar los servicios
        stage('Construyendo y desplegando servicios...') {
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

