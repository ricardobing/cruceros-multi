# 📚 Guía de Estudio Interna - Cruceros Multi

> **⚠️ DOCUMENTO PRIVADO** - Esta guía es exclusivamente para que tú (el autor) entiendas, estudies y defiendas este proyecto en entrevistas. NO es documentación pública.

---

## 1. 🎯 Visión General del Proyecto

### ¿Qué es este proyecto?

**Cruceros Multi** es una plataforma web de reservas de excursiones turísticas para pasajeros de cruceros. Piensa en esto como una versión simplificada de sitios como "Shore Excursions Group" o las plataformas de reserva de tours que usan las líneas de cruceros.

**En términos simples:**
- Un pasajero de crucero llega a un puerto (ej: Cozumel, Nassau)
- Quiere reservar una excursión (buceo, tour histórico, playa)
- Entra a esta web, ve las opciones, y reserva

### ¿Qué problema intenta resolver?

**Problema conceptual:**
Los pasajeros de cruceros tienen tiempo limitado en cada puerto (unas horas) y necesitan reservar actividades con antelación. Las excursiones deben:
- Estar confirmadas si hay suficientes participantes
- Mostrar disponibilidad en tiempo real
- Funcionar en múltiples idiomas (turistas internacionales)
- Ser fáciles de buscar y comparar

**Tu solución (en este demo):**
- Búsqueda por barco, destino, fecha
- Sistema de estados: "confirmada" vs "pendiente"
- Multiidioma (español/inglés)
- Interfaz clara y responsive

### ¿Por qué es un buen proyecto demo para CV?

**Razones estratégicas:**

1. **Stack moderno y relevante (2026)**
   - Next.js 15 (lo último)
   - React 19
   - TypeScript
   - Internacionalización profesional

2. **Demuestra habilidades específicas:**
   - Manejo de rutas dinámicas (`[locale]`, `[id]`)
   - Server Components vs Client Components
   - i18n implementado correctamente desde el inicio
   - Arquitectura escalable (aunque esté con mock data)

3. **Es "presentable" sin estar terminado:**
   - No es un tutorial copiado (proyecto real de cliente)
   - No necesita backend funcionando para demostrar capacidad
   - Muestra decisiones pragmáticas (mock data intencional)

4. **Tiene contexto de negocio real:**
   - No es una todo-app ni un clon de Twitter
   - Resuelve un problema específico de turismo
   - Fácil de explicar en 30 segundos

**Lo que comunica a un reclutador:**
> "Este desarrollador entiende Next.js moderno, puede trabajar con clientes reales, toma decisiones técnicas sensatas, y sabe comunicar el estado del proyecto honestamente."

---

## 2. 🏗️ Arquitectura General (Explicada Simple)

### Frontend / Backend en este proyecto

**Concepto clave:** En Next.js, el "frontend" y el "backend" viven en el mismo lugar, pero se ejecutan en momentos diferentes.

**Frontend (lo que ve el usuario):**
- Las páginas HTML que se muestran en el navegador
- Los componentes de React (Navigation, SearchForm, ExcursionCard)
- Los estilos (Tailwind CSS)

**Backend (lo que pasa en el servidor):**
- Las "API Routes" en `app/api/` (como `/api/ships`, `/api/reservations`)
- Los "Server Components" que obtienen datos antes de renderizar
- El middleware que maneja el cambio de idioma

**En este proyecto HOY:**
- Backend real = NO existe (no hay PostgreSQL conectado)
- Backend simulado = Sí (API routes retornan mock data)
- Frontend = Funciona perfectamente

### ¿Qué hace Next.js en este proyecto?

**Next.js es como un "director de orquesta" que coordina:**

1. **Routing (enrutamiento)**
   - Convierte carpetas en URLs
   - `app/[locale]/page.tsx` → `cruceros-multi.vercel.app/es`
   - `app/[locale]/excursions/[id]/page.tsx` → `/es/excursions/123`

2. **Renderizado**
   - Decide qué se genera en el servidor y qué en el cliente
   - Hace las páginas más rápidas

3. **Optimización automática**
   - Divide el código JavaScript en pedazos pequeños
   - Precarga páginas que probablemente visitarás
   - Optimiza imágenes (aunque no usamos next/image aquí)

4. **API Routes**
   - Te permite crear endpoints sin necesidad de Express o similar
   - `app/api/reservations/route.ts` → endpoint `/api/reservations`

### ¿Qué significa que sea "App Router"?

**Contexto histórico (simple):**

**Antes (Pages Router):**
- Estructura: `pages/index.js` → ruta `/`
- Más viejo, todavía funciona

**Ahora (App Router):**
- Estructura: `app/page.tsx` → ruta `/`
- Más nuevo (introducido en Next.js 13, estable en 14/15)
- Permite Server Components

**En tu proyecto:**
Usas App Router porque es lo moderno. Significa que:
- La carpeta `app/` controla las rutas
- Puedes usar Server Components (más rápido)
- i18n es más fácil con carpetas dinámicas `[locale]`

**¿Qué decir en entrevista?**
> "Usé App Router porque es el estándar actual de Next.js y permite Server Components, que mejoran el rendimiento al reducir JavaScript en el cliente."

### SSR vs Static en este contexto

**Conceptos:**

**SSR (Server-Side Rendering):**
- La página se genera en el servidor **cada vez** que alguien la visita
- Contenido dinámico, actualizado
- Más lento (pero sigue siendo rápido)

**Static (Static Generation):**
- La página se genera **una vez** en el build
- Contenido fijo, super rápido
- Ideal para páginas que no cambian

**En tu proyecto:**

La mayoría de tus páginas son **dinámicas (SSR)** porque:
- Dependen de parámetros (`[locale]`, `[id]`)
- Podrían cambiar según datos de backend (aunque sea mock)

**Ejemplo:**
- `/es/excursions/123` → Se genera cuando alguien visita esa URL
- Busca la excursión con ID 123
- Renderiza en español

**¿Por qué no Static?**
Porque si tuvieras 1000 excursiones, no quieres generar 1000 páginas HTML al hacer deploy. Es más flexible renderizar bajo demanda.

**¿Qué decir en entrevista?**
> "Usé rendering dinámico (SSR) porque las páginas dependen de parámetros de URL y datos que podrían cambiar. Si fuera un blog con posts fijos, usaría Static Generation con ISR (Incremental Static Regeneration)."

---

## 3. 🌍 Internacionalización (i18n)

### Cómo funciona el multi-idioma conceptualmente

**Objetivo:** Que la misma app funcione en español e inglés sin duplicar todo el código.

**Estrategia:**

1. **URLs separadas por idioma:**
   - `/es/excursions` → Español
   - `/en/excursions` → English
   - La URL define el idioma

2. **Archivos de traducción:**
   - `messages/es.json` → Todas las traducciones en español
   - `messages/en.json` → Todas las traducciones en inglés

3. **Biblioteca que conecta todo:**
   - `next-intl` lee la URL, decide qué archivo cargar, reemplaza textos

**Ejemplo práctico:**

```
Usuario visita → /es/excursions
  ↓
Middleware detecta "es" en la URL
  ↓
Carga messages/es.json
  ↓
Componente pide traducción: t('excursions.title')
  ↓
Retorna: "Excursiones disponibles"
```

Si fuera `/en/excursions`:
```
Carga messages/en.json
  ↓
t('excursions.title')
  ↓
Retorna: "Available Excursions"
```

### ¿Qué pasa cuando cambio de /es a /en?

**Paso a paso:**

1. **Usuario hace click en el botón "EN"**
   - Botón en `components/Navigation.tsx`

2. **JavaScript cambia la URL**
   - De `/es/excursions` a `/en/excursions`

3. **Next.js recarga la página con la nueva URL**

4. **Middleware intercepta la petición**
   - Archivo `middleware.ts` revisa la URL
   - Detecta que el locale es "en"

5. **Server Component se renderiza de nuevo**
   - Ahora usa `getTranslations({ locale: 'en', ... })`
   - Carga `messages/en.json`

6. **HTML llega al navegador en inglés**

**Importante:** No es un cambio "dinámico" en el cliente (sin recargar). Es una navegación real a otra URL.

### ¿Qué archivos o carpetas están involucradas?

**Archivos clave para i18n:**

1. **`i18n.ts`** (raíz del proyecto)
   - Configuración: qué idiomas soportas (`['en', 'es']`)
   - Idioma por defecto

2. **`middleware.ts`**
   - Intercepta TODAS las requests
   - Decide qué hacer con la URL según el idioma
   - Si visitas `/` → redirige a `/es` o `/en` según tu navegador

3. **`app/[locale]/`** (carpeta dinámica)
   - `[locale]` es una variable (puede ser "es" o "en")
   - Todo lo que esté dentro de esta carpeta hereda el idioma

4. **`messages/es.json` y `messages/en.json`**
   - Diccionarios de traducción
   - Estructura JSON jerárquica

5. **`i18n/routing.ts`**
   - Configuración de rutas para next-intl

**Estructura visual:**

```
middleware.ts ─────► Detecta idioma, redirige si necesario
                     │
                     ▼
app/[locale]/ ──────► Recibe "es" o "en" como parámetro
    │
    ├─ page.tsx ────► Usa getTranslations({ locale: 'es' })
    │                 Busca en messages/es.json
    │
    └─ excursions/
         └─ page.tsx ► Usa getTranslations({ locale: 'es', namespace: 'excursions' })
                       Busca en messages/es.json → sección "excursions"
```

### ¿Qué debería explicar en una entrevista sobre esto?

**Script de 2 minutos:**

> "Implementé internacionalización usando **next-intl**, que es la biblioteca más robusta para Next.js 15 con App Router.
>
> La estrategia es **URL-based locales**: cada idioma tiene su propia URL (`/es/excursions`, `/en/excursions`). Esto es mejor que cookies o localStorage porque:
> - Es compartible (puedes mandar un link en español a alguien)
> - Es SEO-friendly (Google indexa ambos idiomas)
> - Es más claro
>
> Tengo un **middleware** que intercepta todas las requests y redirige `/` a `/es` o `/en` según el idioma del navegador del usuario.
>
> Uso **Server Components** con `getTranslations()` en lugar de Client Components, lo que mejora el rendimiento porque las traducciones se resuelven en el servidor. Solo uso `useTranslations()` (client-side) en componentes interactivos como el Navigation.
>
> Las traducciones están en archivos JSON (`messages/es.json`, `messages/en.json`) con estructura jerárquica. Por ejemplo: `excursions.title`, `excursions.noResults`, etc.
>
> Si tuviera que agregar francés, solo necesitaría:
> 1. Agregar `'fr'` al array de locales
> 2. Crear `messages/fr.json`
> 3. Listo, el middleware y las rutas ya funcionan"

**Puntos clave a destacar:**
- URL-based (no cookies)
- Server-side translations (performance)
- Escalable (fácil agregar más idiomas)
- SEO-friendly

---

## 4. 📊 Flujo de Datos (Conceptual)

### De dónde salen los datos hoy (mock)

**Archivo fuente:** `lib/mockData.ts`

**Qué contiene:**
- `mockShips` → 3 cruceros (Ocean Majesty, Caribbean Dream, Sea Explorer)
- `mockDestinations` → 4 destinos (Caribbean, Mediterranean, Alaska, Northern Europe)
- `mockExcursions` → 6 excursiones con toda su info (título, precio, destino, departures)

**Estructura de los datos (simplificado):**

```javascript
mockExcursions = [
  {
    id: '1',
    title: 'Snorkeling Adventure',
    price: 89.99,
    destination: { name: 'Caribbean' },
    departures: [
      {
        date: '2025-12-15',
        currentParticipants: 15,
        maxParticipants: 25,
        status: 'confirmed',
        cruiseShip: { name: 'Ocean Majesty' }
      }
    ]
  },
  // ... más excursiones
]
```

**¿Por qué esta estructura?**
Imita exactamente cómo vendría de una base de datos con Prisma:
- Relaciones anidadas (`destination`, `cruiseShip`)
- Campos de timestamps (`createdAt`, `updatedAt`)
- Estados (`status: 'confirmed' | 'pending' | 'full'`)

### Cómo se renderizan las páginas

**Ejemplo: Página de listado de excursiones** (`/es/excursions`)

**Flujo paso a paso:**

1. **Usuario visita:** `cruceros-multi.vercel.app/es/excursions`

2. **Servidor Next.js ejecuta:** `app/[locale]/excursions/page.tsx`

3. **Código corre en el servidor:**
   ```javascript
   // Server Component - corre en el servidor
   const excursions = mockExcursions; // Lee el mock
   const t = await getTranslations({ locale: 'es', namespace: 'excursions' });
   ```

4. **Se genera HTML con los datos:**
   ```html
   <h1>Excursiones disponibles</h1>
   <div class="grid">
     <ExcursionCard excursion={excursion1} />
     <ExcursionCard excursion={excursion2} />
     ...
   </div>
   ```

5. **HTML llega al navegador del usuario**
   - Ya renderizado, listo para mostrar
   - Luego se "hidrata" (React toma control para interactividad)

**Ejemplo: Página de detalle** (`/es/excursions/1`)

1. Usuario hace click en "Ver detalles"

2. Navega a `/es/excursions/1`

3. Servidor ejecuta: `app/[locale]/excursions/[id]/page.tsx`

4. Código busca la excursión:
   ```javascript
   const { id } = await params; // id = '1'
   const excursion = mockExcursions.find(exc => exc.id === id);
   ```

5. Si existe → Renderiza la página de detalle

6. Si NO existe → Next.js muestra la página 404

**¿Qué pasa cuando navego por la app?**

**Primera visita (cold start):**
- Servidor genera el HTML completo
- Navegador recibe HTML + CSS + JavaScript
- React se "hidrata" (convierte HTML estático en interactivo)

**Navegación subsecuente:**
- Next.js hace "prefetch" de las páginas que podrías visitar
- Cuando haces click, ya tiene los datos
- Transición rápida, parece una SPA (Single Page App)

**Componentes Client vs Server:**

**Server Components** (mayoría):
- `app/[locale]/page.tsx`
- `app/[locale]/excursions/page.tsx`
- Se ejecutan solo en el servidor
- No pueden usar hooks como `useState`, `useEffect`
- Más rápidos (menos JavaScript al cliente)

**Client Components** (pocos):
- `components/Navigation.tsx` → Necesita `useState` para el menu móvil
- `components/SearchForm.tsx` → Necesita interactividad (selects, botón)
- Marcados con `'use client'` al inicio

---

## 5. 🗄️ Cómo Estaría Hecho "Bien" con Base de Datos Real

### ¿Qué base de datos usaría?

**Opción A: Supabase (recomendado para este proyecto)**

**Por qué Supabase:**
- Es PostgreSQL bajo el capa (base de datos potente y profesional)
- Tiene una interfaz web para ver y editar datos
- Incluye autenticación built-in
- Gratis para proyectos pequeños
- Compatible con Prisma

**Opción B: Firebase (alternativa)**
- Más fácil para principiantes
- NoSQL (estructura diferente)
- Realtime por defecto
- Bueno para apps móviles

**Opción C: PostgreSQL + Railway/Render**
- Base de datos "pura"
- Más control
- Requiere más setup

**Para este proyecto:** Supabase es ideal porque ya tienes el schema de Prisma diseñado, y Supabase es PostgreSQL.

### ¿Qué iría a la base de datos?

**Tablas (modelos en Prisma):**

**1. CruiseShip** (Cruceros)
```
id, name, description, createdAt, updatedAt

Ejemplo:
- Ocean Majesty
- Caribbean Dream
```

**2. Destination** (Destinos)
```
id, name, country, description, createdAt, updatedAt

Ejemplo:
- Caribbean (Multiple)
- Mediterranean (Multiple)
```

**3. Excursion** (Excursiones)
```
id, title, description, imageUrl, destinationId, createdAt, updatedAt

Ejemplo:
- Snorkeling Adventure → Destino: Caribbean
- Historic City Tour → Destino: Mediterranean
```

**4. Departure** (Salidas/Fechas)
```
id, excursionId, cruiseShipId, date, minParticipants, maxParticipants,
currentParticipants, status, createdAt, updatedAt

Ejemplo:
- Excursion: Snorkeling → Ship: Ocean Majesty → Date: 2025-12-15
- Status: confirmed (tiene 15 de 10 mínimo)
```

**5. Reservation** (Reservas)
```
id, departureId, userName, userEmail, status, createdAt, updatedAt

Ejemplo:
- Juan Pérez reservó para la salida del 15/12/2025
- Status: confirmed
```

**Relaciones:**

```
Destination ─┬─► Excursion ─┬─► Departure ─┬─► Reservation
             │               │              │
CruiseShip ──┘               └──────────────┘
```

**Traducción a español:**
- Un **Destino** tiene muchas **Excursiones**
- Una **Excursión** tiene muchas **Salidas** (fechas diferentes, barcos diferentes)
- Una **Salida** tiene muchas **Reservas** (personas que reservaron)
- Un **Crucero** tiene muchas **Salidas** (el barco hace varias excursiones)

### ¿Cómo se conectaría Next.js con esa base?

**Flujo con Supabase + Prisma:**

1. **Setup inicial:**
   ```bash
   # Configurar .env con la URL de Supabase
   DATABASE_URL="postgresql://user:pass@db.supabase.co:5432/postgres"
   
   # Generar cliente Prisma
   npx prisma generate
   
   # Crear tablas en Supabase
   npx prisma migrate deploy
   ```

2. **En el código (Server Component):**
   ```javascript
   // app/[locale]/excursions/page.tsx
   import { prisma } from '@/lib/prisma'; // Ya existe este archivo
   
   // En lugar de mockExcursions:
   const excursions = await prisma.excursion.findMany({
     include: {
       destination: true,
       departures: {
         where: { date: { gte: new Date() } },
         include: { cruiseShip: true }
       }
     }
   });
   ```

3. **Prisma hace la query SQL automáticamente:**
   ```sql
   SELECT * FROM Excursion
   JOIN Destination ON ...
   JOIN Departure ON ...
   WHERE Departure.date >= NOW()
   ```

4. **Retorna datos en formato JavaScript:**
   ```javascript
   [
     {
       id: '1',
       title: 'Snorkeling...',
       destination: { name: 'Caribbean' },
       departures: [...]
     }
   ]
   ```

5. **Renderiza como siempre:**
   Mismo código de componentes, solo cambia de dónde vienen los datos.

**En API Routes (para reservas):**

```javascript
// app/api/reservations/route.ts
export async function POST(request) {
  const { departureId, userName, userEmail } = await request.json();
  
  // Crear reserva en la base de datos
  const reservation = await prisma.reservation.create({
    data: { departureId, userName, userEmail, status: 'confirmed' }
  });
  
  // Actualizar contador de participantes
  await prisma.departure.update({
    where: { id: departureId },
    data: { currentParticipants: { increment: 1 } }
  });
  
  return NextResponse.json(reservation);
}
```

### ¿Qué parte iría al backend y qué al frontend?

**Backend (Server Components + API Routes):**

✅ **Consultas a la base de datos**
- Leer excursiones, destinos, barcos
- Filtrar por fecha, destino
- Buscar una excursión específica

✅ **Lógica de negocio**
- Calcular si una salida está confirmada (min participants)
- Validar disponibilidad (no exceder max participants)
- Actualizar estados (pending → confirmed)

✅ **Operaciones sensibles**
- Crear reservas
- Procesar pagos (si hubiera Stripe)
- Enviar emails de confirmación

**Frontend (Client Components):**

✅ **Interactividad**
- Forms de búsqueda
- Botones, modales
- Cambio de idioma

✅ **Navegación**
- Links entre páginas
- Menu responsive

❌ **NO va en el frontend:**
- Lógica de reservas (puede ser manipulada)
- Acceso directo a base de datos (inseguro)
- Secrets (API keys, passwords)

**Regla simple:**
> Si puede ser hackeado o necesita datos privados → Backend  
> Si es solo UI/UX → Frontend

---

## 6. 🔐 Autenticación (Teórica)

### ¿Qué pasaría si hubiera usuarios?

**Escenarios donde necesitarías auth:**

1. **Usuarios normales (turistas):**
   - Crear cuenta
   - Login
   - Ver sus reservas
   - Editar perfil

2. **Administradores:**
   - Agregar nuevas excursiones
   - Ver todas las reservas
   - Modificar precios

**Flujo típico con autenticación:**

```
Usuario sin login:
  → Puede ver excursiones (público)
  → NO puede reservar
  → Click "Reservar" → Redirige a /login

Usuario con login:
  → Puede ver excursiones
  → Puede reservar
  → Tiene un botón "Mis Reservas"
```

### ¿Dónde entraría Firebase Auth o similar?

**Opciones populares:**

**1. NextAuth.js (ahora Auth.js)**
- Específico para Next.js
- Soporta Google, GitHub, email/password
- Gratis, open source

**2. Clerk**
- UI pre-hecha muy bonita
- Setup rápido
- Tiene plan gratis generoso

**3. Supabase Auth**
- Viene incluido si usas Supabase
- Compatible con Prisma

**4. Firebase Auth**
- Bueno si ya usas Firebase
- UI básica incluida

**¿Cómo se implementaría? (ejemplo con NextAuth):**

**Paso 1: Instalar y configurar**

```javascript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

**Paso 2: Proteger rutas**

```javascript
// app/api/reservations/route.ts
import { getServerSession } from 'next-auth';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Usuario autenticado, proceder con la reserva
  const reservation = await prisma.reservation.create({
    data: {
      ...data,
      userId: session.user.id // Vincular reserva al usuario
    }
  });
}
```

**Paso 3: Mostrar info del usuario**

```javascript
// components/Navigation.tsx
'use client';
import { useSession } from 'next-auth/react';

export default function Navigation() {
  const { data: session, status } = useSession();
  
  return (
    <nav>
      {status === 'authenticated' ? (
        <>
          <span>Hola, {session.user.name}</span>
          <button onClick={signOut}>Salir</button>
        </>
      ) : (
        <button onClick={signIn}>Login</button>
      )}
    </nav>
  );
}
```

### ¿Qué explicaría si me preguntan por seguridad?

**Script de respuesta:**

> "En este demo no implementé autenticación porque el objetivo era mostrar la arquitectura frontend e i18n, pero si lo agregara, usaría **NextAuth.js** (ahora Auth.js).
>
> **¿Por qué NextAuth?**
> Porque maneja toda la complejidad de OAuth, sesiones, cookies de forma segura. Soporta login con Google, GitHub, o email/password.
>
> **¿Cómo protegería las rutas?**
> Las API routes verificarían la sesión con `getServerSession()` antes de hacer cualquier operación sensible como crear reservas. Si no hay sesión, retornaría 401 Unauthorized.
>
> **¿Dónde se guardaría la info del usuario?**
> Agregaría un modelo `User` en Prisma con campos como email, name, role (user/admin). Las reservas tendrían un `userId` para vincularlas.
>
> **Otras medidas de seguridad:**
> - Las API keys y secrets irían en variables de entorno (`.env.local`)
> - Validaría los inputs con Zod antes de guardar en DB
> - Usaría HTTPS en producción (Vercel lo hace automático)
> - Implementaría rate limiting para prevenir spam/ataques"

**Conceptos clave a mencionar:**
- OAuth vs email/password
- Session management (cookies, JWT)
- Environment variables para secrets
- HTTPS (encriptación)
- Input validation
- Rate limiting

---

## 7. ⚖️ Decisiones de Diseño Importantes

### ¿Qué cosas están simplificadas a propósito?

**1. Mock Data en lugar de DB conectada**

**Por qué:**
- ✅ Cero costos de infraestructura
- ✅ Demo más rápido y estable
- ✅ No necesito mantener un servidor de DB
- ✅ Fácil de probar localmente sin setup

**Trade-off:** No puedo demostrar queries complejas en tiempo real, pero sí puedo explicar cómo lo haría.

**2. Sin autenticación**

**Por qué:**
- ✅ Reduce complejidad del demo
- ✅ Cualquier reviewer puede navegar sin crear cuenta
- ✅ El foco está en la arquitectura, no en auth

**Trade-off:** No puedo mostrar "Mis Reservas" ni dashboard de usuario.

**3. Sin pagos (Stripe/PayPal)**

**Por qué:**
- ✅ Evita fricción legal (procesar pagos reales)
- ✅ No necesito certificaciones PCI
- ✅ El concepto de "reservar" se entiende igual

**Trade-off:** No demuestra integración con servicios de pago.

**4. Imágenes de Unsplash (URLs externas)**

**Por qué:**
- ✅ Rápido de implementar
- ✅ No necesito subir/almacenar imágenes
- ✅ URLs funcionan sin hosting de assets

**Trade-off:** Si Unsplash cae, las imágenes no cargan (pero es raro).

**5. Estados simplificados (confirmed/pending/full)**

**Por qué:**
- ✅ Fácil de entender conceptualmente
- ✅ Demuestra lógica condicional

**Trade-off:** Un sistema real tendría más estados (cancelled, refunded, etc.)

### ¿Qué cosas están deshabilitadas y por qué?

**1. Formulario de reserva funcional**

**Estado actual:** El botón existe, pero no hace una reserva real.

**Por qué deshabilitado:**
- Sin backend real, no tiene dónde guardar
- Sin auth, no sabemos quién reserva
- Sin email service, no podríamos confirmar

**Si alguien pregunta:**
> "El flujo de reserva está maquetado. En producción, el botón dispararía una llamada a `/api/reservations` con NextAuth para verificar al usuario, guardaría en la DB con Prisma, y enviaría un email de confirmación con SendGrid o Resend."

**2. Búsqueda por barco específico**

**Estado actual:** El dropdown de barcos existe en SearchForm pero no filtra.

**Por qué:**
- Mock data tiene solo 3 barcos
- Filtrar por barco + destino sería redundante en el demo

**Si alguien pregunta:**
> "El componente SearchForm tiene el select de barcos preparado. Solo faltaría pasar el parámetro `ship` en la query de excursions/page.tsx y filtrar mockExcursions (o hacer la query con Prisma si hubiera DB)."

**3. Paginación**

**Estado actual:** Muestra todas las excursiones en una grid.

**Por qué:**
- Solo hay 6 excursiones de ejemplo
- No tiene sentido paginar con tan pocos items

**Si alguien pregunta:**
> "Con más datos, usaría paginación server-side con Prisma (skip/take) o un infinite scroll con React Query. Como son solo 6 items, no es necesario."

### ¿Qué trade-offs se tomaron?

**Trade-off = Decisión donde sacrificas algo para ganar otra cosa**

**1. Demo estabilidad vs Funcionalidad completa**

**Decisión:** Priorizar que el demo **NUNCA** se rompa, aunque no haga todo.

**Ganancia:**
- Reviewers pueden navegar sin errores
- No hay "loading..." eterno si la DB está caída
- Impresión profesional

**Costo:**
- No puedo demostrar transacciones reales
- No hay "wow factor" de datos en tiempo real

**2. Rapidez de desarrollo vs Perfección técnica**

**Decisión:** Usar mock data en lugar de setup completo de Supabase + Prisma.

**Ganancia:**
- Proyecto listo en días, no semanas
- Más tiempo para pulir UI/UX y documentación

**Costo:**
- No puedo decir "esto usa una DB real"
- Pero SÍ puedo decir "la arquitectura está lista para conectar DB"

**3. i18n completo vs Velocidad inicial de carga**

**Decisión:** Implementar i18n desde el inicio (no agregarlo después).

**Ganancia:**
- Demuestra planificación y arquitectura sólida
- Más impresionante que una app monolingüe

**Costo:**
- Un poco más complejo de explicar
- URLs más largas (`/es/...` en lugar de `/...`)

**Pero:** Este costo es mínimo y la ganancia es enorme en una entrevista.

---

## 8. 🎤 Cómo Defender este Proyecto en una Entrevista

### Cómo lo explico en 2 minutos (elevator pitch)

**Script optimizado:**

> "**Cruceros Multi** es una plataforma de reservas de excursiones turísticas para pasajeros de cruceros. La construí para un cliente real, pero el desarrollo se pausó. En lugar de dejarlo incompleto, lo refiné como proyecto demo profesional.
>
> **Stack técnico:**
> - Next.js 15 con App Router (lo más reciente)
> - TypeScript para type-safety
> - Internacionalización completa con next-intl (español e inglés)
> - Prisma ORM para el diseño de la base de datos
> - Deployment en Vercel
>
> **Características destacadas:**
> - i18n con URLs localizadas (`/es/excursions`, `/en/excursions`)
> - Server Components para mejor rendimiento
> - Sistema de estados para excursiones (confirmada/pendiente según participantes)
> - Responsive design con Tailwind CSS
>
> **Decisión técnica clave:**
> Uso mock data intencionalmente para mantener cero costos de infraestructura y garantizar estabilidad del demo. El schema de Prisma está completo y listo para conectar Supabase cuando sea necesario.
>
> **Lo que demuestra:**
> Que puedo trabajar con clientes reales, tomar decisiones técnicas pragmáticas, implementar arquitecturas escalables, y comunicar el estado del proyecto honestamente."

**Tiempo:** Exactamente 1:30 - 2:00 minutos

### ¿Qué destacar primero?

**Orden de prioridad:**

**1. Stack moderno (15 segundos)**
> "Next.js 15, TypeScript, i18n profesional con next-intl"

**Por qué primero:** Establece que conoces tecnología actual y relevante.

**2. i18n implementation (30 segundos)**
> "Implementé internacionalización desde el inicio con URLs localizadas y server-side translations para mejor performance"

**Por qué segundo:** Es lo más destacado técnicamente. No es común en proyectos demo.

**3. Arquitectura (30 segundos)**
> "Uso Server Components por defecto para reducir JavaScript en el cliente, y separé claramente la lógica de negocio en API routes"

**Por qué tercero:** Demuestra que entiendes conceptos avanzados de Next.js 15.

**4. Decisión de mock data (20 segundos)**
> "Decidí usar mock data en producción para estabilidad del demo, pero el schema de Prisma está listo para conectar una base de datos real"

**Por qué cuarto:** Convierte una "limitación" en una decisión técnica intencional.

**5. Live demo (30 segundos)**
> "Puedo mostrarte el cambio de idioma, la navegación, el sistema de filtros..."

**Por qué último:** Lo visual se recuerda. Cierra con algo memorable.

### ¿Qué aclarar para que no parezca incompleto?

**Frases clave para reframe (cambiar la percepción):**

❌ **NO digas:**
> "No pude terminarlo porque el cliente se fue"
> "Le falta el backend"
> "No tiene base de datos conectada"

✅ **SÍ di:**

**Sobre el estado del proyecto:**
> "Es un proyecto real que se pausó por decisión del cliente. En lugar de dejarlo, lo refiné como portfolio piece. La arquitectura está completa y producción-ready."

**Sobre la falta de backend:**
> "Tomé la decisión técnica de usar mock data para el demo por estabilidad y costos. El schema de Prisma está diseñado y probado localmente. Conectar Supabase requeriría cambiar solo los imports, el resto del código ya funciona."

**Sobre features faltantes:**
> "Prioricé demostrar arquitectura moderna (Next.js 15, i18n) sobre features completas. Autenticación y pagos están fuera del MVP intencional, pero puedo explicar cómo los implementaría."

**Sobre la complejidad:**
> "El proyecto balancea complejidad técnica (i18n, Server Components) con pragmatismo (mock data). Así un reviewer puede evaluarlo en 15 minutos sin necesitar credenciales de DB."

**Estructura de respuesta ante críticas:**

**Si dicen:** "Esto no tiene backend real"

**Responde:**
1. **Reconoce:** "Correcto, usa mock data."
2. **Justifica:** "Decidí priorizar estabilidad del demo y costos cero."
3. **Demuestra competencia:** "El schema de Prisma muestra que sé diseñar bases de datos relacionales. Si conectara Supabase, solo cambiaría los imports de mockData a prisma, el resto funciona igual."
4. **Voltea a positivo:** "Esto me permitió enfocarme en una implementación sólida de i18n, que es menos común en demos."

---

## 9. 📖 Qué Debería Estudiar Antes de una Entrevista

### Lista de conceptos técnicos que aparecen

**Nivel Básico (debes saber explicar):**

- [ ] **Next.js App Router vs Pages Router**
  - Qué es cada uno, por qué elegiste App Router

- [ ] **Server Components vs Client Components**
  - Cuándo usar cada uno, ejemplos en tu código

- [ ] **TypeScript básico**
  - Por qué usas TypeScript, qué beneficios

- [ ] **Tailwind CSS**
  - Qué es utility-first, por qué en lugar de CSS modules

- [ ] **API Routes en Next.js**
  - Cómo funciona `app/api/`, ejemplo simple

**Nivel Intermedio (debes tener idea general):**

- [ ] **Prisma ORM**
  - Qué es un ORM, por qué Prisma, qué hace `schema.prisma`

- [ ] **Middleware en Next.js**
  - Para qué sirve, por qué lo usas (i18n)

- [ ] **SSR (Server-Side Rendering)**
  - Qué significa, cuándo es útil

- [ ] **Dynamic Routes**
  - Cómo funciona `[locale]` y `[id]` en las carpetas

- [ ] **Internationalization (i18n)**
  - Por qué es importante, cómo funciona en tu app

**Nivel Avanzado (opcional, mencionar si preguntan):**

- [ ] **Incremental Static Regeneration (ISR)**
  - Qué es, cuándo lo usarías (no lo usas ahora)

- [ ] **React Suspense**
  - Qué es, cómo Next.js lo usa internamente

- [ ] **Edge Functions vs Serverless**
  - Diferencia, dónde corren tus API routes

- [ ] **Database Indexing**
  - Qué índices pondrías en las tablas de Prisma

### En qué archivos mirar para refrescar memoria

**Antes de una entrevista, abre estos archivos en orden:**

**1. README.md** (5 minutos)
- Refrescar el overview del proyecto
- Recordar el stack técnico
- Repasar la sección "What This Project Demonstrates"

**2. app/[locale]/page.tsx** (3 minutos)
- Ver cómo usas Server Components
- Recordar cómo llamas a getTranslations
- Ver el try-catch con fallback a mock data

**3. app/[locale]/excursions/page.tsx** (3 minutos)
- Ver cómo filtras datos
- Recordar la estructura de parámetros (params, searchParams)
- Ver cómo pasas datos a ExcursionCard

**4. components/Navigation.tsx** (2 minutos)
- Ver un ejemplo de Client Component (`'use client'`)
- Recordar cómo funciona el cambio de idioma (buildLocaleHref)

**5. lib/mockData.ts** (2 minutos)
- Repasar la estructura de datos
- Notar que imita exactamente Prisma types

**6. middleware.ts** (2 minutos)
- Ver cómo interceptas requests para i18n
- Recordar la configuración de locales

**7. prisma/schema.prisma** (3 minutos)
- Repasar las relaciones entre modelos
- Prepararte para explicar por qué diseñaste así

**Total: 20 minutos** antes de una entrevista y estarás fresco.

### ¿Qué NO necesito saber en profundidad?

**No pierdas tiempo estudiando esto para defender este proyecto:**

❌ **Algoritmos complejos**
- Este proyecto no usa algoritmos avanzados
- Si preguntan, di: "No era necesario aquí, pero puedo explicar búsqueda binaria o sorts si quieres"

❌ **Testing (Jest, React Testing Library)**
- No hay tests en este proyecto
- Si preguntan: "No implementé tests para el demo, pero en producción usaría Jest para unit tests y Playwright para E2E"

❌ **CI/CD pipelines**
- Vercel hace el deploy automático
- Si preguntan: "Vercel maneja el CI/CD. En proyectos más grandes, usaría GitHub Actions para correr tests antes de merge"

❌ **Docker / Kubernetes**
- No necesario para Next.js en Vercel
- Si preguntan: "Para este stack, serverless es más eficiente que containers. Usaría Docker si necesitara servicios custom o deployar en AWS EC2"

❌ **GraphQL**
- Este proyecto usa REST (API routes simples)
- Si preguntan: "Elegí REST por simplicidad. GraphQL sería útil si tuviera queries muy complejas con muchas relaciones"

❌ **Micro-frontends**
- Este es un monolito simple (y está bien)
- Si preguntan: "Para un proyecto de este tamaño, un monolito es más eficiente. Micro-frontends son para equipos grandes con dominios independientes"

❌ **WebSockets / Real-time**
- No hay features en tiempo real
- Si preguntan: "Si necesitara real-time (ej: disponibilidad en vivo), usaría Supabase Realtime o Socket.io"

---

## 📝 Resumen para Memorizar (5 minutos antes de entrevista)

### El Proyecto en 5 Bullets

1. **Plataforma de reservas de excursiones para cruceros** (turismo)
2. **Next.js 15 + TypeScript + i18n completo** (español/inglés)
3. **Server Components para performance**, mock data para estabilidad
4. **Prisma schema listo**, arquitectura preparada para DB real
5. **Proyecto real de cliente**, refinado como portfolio profesional

### Stack en 1 Línea
> Next.js 15, React 19, TypeScript, Tailwind CSS, next-intl, Prisma, Vercel

### Decisión Técnica Clave
> Mock data intencional para demo estable sin costos. Schema de Prisma completo y listo para conectar Supabase.

### Feature Más Impresionante
> Internacionalización con URLs localizadas y server-side translations desde el inicio.

### Si Solo Puedo Decir 1 Cosa
> "Demuestra que puedo arquitecturar apps escalables con Next.js moderno, tomar decisiones pragmáticas, y comunicar honestamente el estado del proyecto."

---

## 🎯 Checklist Pre-Entrevista

**30 minutos antes:**

- [ ] Abrir el [demo live](https://cruceros-multi.vercel.app/es) en una pestaña
- [ ] Probar el cambio de idioma (ES → EN)
- [ ] Navegar a 2-3 excursiones para recordar el flujo
- [ ] Abrir VS Code con el proyecto
- [ ] Leer esta guía (sección 8: "Cómo defender")
- [ ] Revisar los 7 archivos clave (sección 9)
- [ ] Tener el README.md abierto en otra pestaña
- [ ] Respirar profundo, tomar agua

**Si te piden screen share:**

- [ ] Tener el demo abierto (no el localhost, el deploy)
- [ ] Tener VS Code con el proyecto abierto
- [ ] Cerrar pestañas personales (privacidad)
- [ ] Audio y cámara funcionando

**Frase para empezar con confianza:**
> "¿Quieres que primero te muestre el demo funcionando o prefieres que te explique la arquitectura?"

(Esto te da control de la conversación y muestra proactividad)

---

## ✅ Final: Eres Capaz de Defenderlo

**Recuerda:**

Este proyecto **ES VÁLIDO** como portfolio piece porque:
- ✅ Usa tecnología actual y relevante
- ✅ Resuelve un problema de negocio real
- ✅ Está bien documentado
- ✅ Demuestra arquitectura sólida
- ✅ Muestra honestidad técnica

**No es un proyecto "incompleto".**  
Es un proyecto **intencionalmente simplificado** para demostrabilidad.

**No necesitas disculparte.**  
Necesitas **explicar las decisiones** con confianza.

**Frase final para la entrevista:**
> "Este proyecto balancea complejidad técnica con pragmatismo. Muestra que puedo construir arquitecturas modernas, trabajar con clientes reales, y tomar decisiones que priorizan estabilidad y mantenibilidad sobre features cosmé ticas."

---

**Última actualización:** Enero 2026  
**Archivo:** STUDY_GUIDE.md  
**Propósito:** Documentación interna para estudio y preparación de entrevistas

**¡Éxito en tu entrevista! 🚀**
