# Despliegue en Google Cloud Run

Este proyecto está configurado para desplegarse fácilmente en Google Cloud Run utilizando un contenedor Docker optimizado.

## Requisitos Previos

1.  Tener una cuenta en Google Cloud Platform (GCP).
2.  Tener instalado y configurado el [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`).
3.  Tener Docker instalado localmente (opcional, para pruebas).

## Variables de Entorno

| Variable | Tipo | ¿Dónde se usa? | Cómo configurarla |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | Build-time (inlined por Next.js) | Hardcodeada en el Dockerfile |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Build-time (inlined por Next.js) | Hardcodeada en el Dockerfile |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor | Build-time + Runtime | Hardcodeada en el Dockerfile (ambas etapas) |

> **Nota:** En esta instancia self-hosted, las keys `anon` y `service_role` son idénticas.
> Ambas están hardcodeadas en el Dockerfile para simplificar el despliegue.
> Si en el futuro se generan keys distintas, se debe volver al esquema de build-arg + Cloud Run env var.

## Pasos para Desplegar

### 1. Construir la imagen en Google Cloud Build

```bash
gcloud builds submit \
  --tag gcr.io/[PROJECT_ID]/[APP_NAME]
```

> No se necesitan `--build-arg` adicionales. Todas las keys están en el Dockerfile.

### 2. Desplegar en Cloud Run

```bash
gcloud run deploy [APP_NAME] \
  --image gcr.io/[PROJECT_ID]/[APP_NAME] \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

- `--allow-unauthenticated`: Hace que tu servicio sea público.

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
*   La `SUPABASE_SERVICE_ROLE_KEY` está hardcodeada en ambas etapas (builder y runner) del Dockerfile para garantizar que las Server Actions funcionen tanto en build time como en runtime.
