
### Hook
- **`use-countdown.ts`**: Hook personalizado para calcular el tiempo restante hasta una fecha objetivo.

### Componentes de Decoración Visual
- **`background-stars.tsx`**: Estrellas animadas en el fondo.
- **`floating-particles.tsx`**: Partículas flotantes navideñas (copos de nieve, estrellas, regalos, etc.).
- **`christmas-lights.tsx`**: Luces de navidad animadas en la parte superior.
- **`animated-moon.tsx`**: Luna animada flotante.

### Componentes Animados
- **`animated-gift.tsx`**: Regalo animado con lazos y brillos.
- **`christmas-tree.tsx`**: Árbol de navidad SVG animado con luces parpadeantes.
- **`countdown-unit.tsx`**: Unidad individual del contador (días, horas, minutos, segundos).

### Componentes de Sección
- **`countdown-header.tsx`**: Encabezado principal con título y fecha.
- **`decorative-elements.tsx`**: Elementos decorativos (árboles y regalo).
- **`countdown-grid.tsx`**: Grid con las 4 unidades del contador.
- **`motivational-message.tsx`**: Mensaje motivacional con información de la encuesta.
- **`cta-buttons.tsx`**: Botones de llamada a la acción (CTA).
- **`footer.tsx`**: Pie de página con mensaje y copos de nieve.
- **`back-button.tsx`**: Botón para volver a la encuesta.

### Exportación
- **`index.ts`**: Archivo central que exporta todos los componentes para facilitar las importaciones.

## Uso

```tsx
import {
  useCountdown,
  FloatingParticles,
  CountdownHeader,
  CountdownGrid,
  // ... otros componentes
} from "@/components/countdown"
```

## Ventajas de la Modularización
