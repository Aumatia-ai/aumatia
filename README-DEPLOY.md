# Despliegue en Google Cloud Run

Este proyecto está configurado para desplegarse fácilmente en Google Cloud Run utilizando un contenedor Docker optimizado.

## Requisitos Previos

1.  Tener una cuenta en Google Cloud Platform (GCP).
2.  Tener instalado y configurado el [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`).
3.  Tener Docker instalado localmente (opcional, para pruebas).

## Variables de Entorno

| Variable | Tipo | ¿Dónde se usa? | Cómo configurarla en Cloud Run |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | Build-time (inlined por Next.js) | Ya hardcodeada en el Dockerfile |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Build-time (inlined por Next.js) | Ya hardcodeada en el Dockerfile |
| `SUPABASE_SERVICE_ROLE_KEY` | **SECRETA** | Build-time + Runtime | Build arg + Variable de entorno en Cloud Run |

## Pasos para Desplegar

### 1. Construir la imagen en Google Cloud Build

Ejecuta el siguiente comando, reemplazando los valores entre corchetes:

```bash
gcloud builds submit \
  --tag gcr.io/[PROJECT_ID]/[APP_NAME] \
  --build-arg SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_real"
```

> **⚠️ IMPORTANTE:** El `--build-arg` es necesario porque Next.js necesita la key al compilar los Server Actions. Sin ella, las funciones de registro, perfil, storage y admin no funcionarán.

### 2. Desplegar en Cloud Run

Una vez construida la imagen, despliégala con el siguiente comando. **Debes pasar la `SUPABASE_SERVICE_ROLE_KEY` como variable de entorno de runtime:**

```bash
gcloud run deploy [APP_NAME] \
  --image gcr.io/[PROJECT_ID]/[APP_NAME] \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_real"
```

- `--allow-unauthenticated`: Hace que tu servicio sea público.
- `--set-env-vars`: Inyecta la key secreta en el contenedor en tiempo de ejecución.

> **💡 Alternativa más segura:** Puedes usar [Secret Manager](https://cloud.google.com/secret-manager) de GCP para gestionar la key:
> ```bash
> gcloud run deploy [APP_NAME] \
>   --image gcr.io/[PROJECT_ID]/[APP_NAME] \
>   --platform managed \
>   --region us-central1 \
>   --allow-unauthenticated \
>   --set-secrets SUPABASE_SERVICE_ROLE_KEY=supabase-service-role-key:latest
> ```

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
*   Las variables `NEXT_PUBLIC_*` están hardcodeadas en el Dockerfile porque Next.js las necesita en build time y son públicas (se exponen al navegador).
*   La `SUPABASE_SERVICE_ROLE_KEY` **nunca** debe hardcodearse en el Dockerfile ni en el repositorio. Siempre se pasa como build-arg y como variable de entorno en Cloud Run.

