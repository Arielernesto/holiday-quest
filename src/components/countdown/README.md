
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

1. **Mantenibilidad**: Cada componente tiene una responsabilidad única y es fácil de mantener.
2. **Reusabilidad**: Los componentes pueden reutilizarse en otras partes de la aplicación.
3. **Testabilidad**: Es más fácil escribir tests unitarios para componentes pequeños.
4. **Legibilidad**: El código principal es más limpio y fácil de entender.
5. **Colaboración**: Múltiples desarrolladores pueden trabajar en diferentes componentes simultáneamente.

## Optimizaciones de Rendimiento

Todos los componentes están optimizados para evitar re-renderizados innecesarios:

### 1. **React.memo**
Todos los componentes están envueltos con `React.memo()` para prevenir re-renderizados cuando sus props no cambian.

### 2. **useMemo para valores aleatorios**
Los componentes con valores aleatorios (estrellas, partículas, luces) usan `useMemo` con array de dependencias vacío `[]` para generar los valores solo una vez en el montaje inicial.

Esto asegura que:
- Las estrellas mantengan su posición fija
- Las partículas no cambien de lugar
- Las luces del árbol mantengan su duración de animación

### 3. **Separación de componentes dinámicos y estáticos**
- **Componentes estáticos**: Decoraciones, fondos, headers (no re-renderizan)
- **Componente dinámico**: Solo `CountdownGrid` se actualiza cada segundo con el nuevo tiempo

### Resultado
Cuando el contador se actualiza cada segundo, **solo el componente `CountdownGrid` se re-renderiza**, manteniendo todas las decoraciones estáticas en su lugar
