# Untitled DS Component Marking

## Rule
Use only one marker attribute in `untitled-ds` components:

```tsx
data-untitled-ds="ComponentName"
```

- Put it on the root element of each named React component.
- The value must match the component function name exactly (PascalCase).
- The value must be a static string literal (no variables/template literals).

## Examples
Correct:
```tsx
function Button() {
  return <button data-untitled-ds="Button">Save</button>
}
```

Incorrect:
```tsx
data-untitled-ds="true"
data-untitled-ds={componentName}
data-untitled-ds={`Button-${variant}`}
```
