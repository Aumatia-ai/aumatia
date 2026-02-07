# Despliegue en Google Cloud Run

Este proyecto está configurado para desplegarse fácilmente en Google Cloud Run utilizando un contenedor Docker optimizado.

## Requisitos Previos

1.  Tener una cuenta en Google Cloud Platform (GCP).
2.  Tener instalado y configurado el [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`).
3.  Tener Docker instalado localmente (opcional, para pruebas).

## Pasos para Desplegar

### 1. Construir la imagen en Google Cloud Build

Ejecuta el siguiente comando en tu terminal, reemplazando `[PROJECT_ID]` con el ID de tu proyecto en GCP y `[APP_NAME]` con el nombre que desees para tu servicio (ej. `aumatia-web`):

```bash
gcloud builds submit --tag gcr.io/[PROJECT_ID]/[APP_NAME]
```

### 2. Desplegar en Cloud Run

Una vez construida la imagen, despliégala con el siguiente comando:

```bash
gcloud run deploy [APP_NAME] \
  --image gcr.io/[PROJECT_ID]/[APP_NAME] \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```
*   `--allow-unauthenticated`: Hace que tu servicio sea público.

### 3. Configurar un Dominio Personalizado

Después de desplegar, sigue estos pasos para añadir tu dominio:

1.  Ve a la consola de [Google Cloud Run](https://console.cloud.google.com/run).
2.  Selecciona tu servicio (`[APP_NAME]`).
3.  Haz clic en la pestaña **"Integraciones"** o busca la opción **"Administrar dominios personalizados"** (Manage Custom Domains).
4.  Haz clic en **"Añadir asignación"** (Add Mapping).
5.  Sigue los pasos para verificar la propiedad de tu dominio y actualizar los registros DNS en tu proveedor de dominio.

## Notas Adicionales

*   El archivo `next.config.ts` ha sido modificado para incluir `output: 'standalone'`, lo que optimiza el tamaño de la imagen Docker.
*   El `Dockerfile` utiliza una construcción en múltiples etapas para asegurar que la imagen final sea ligera y segura.
