export function normalizeScopeArray(scopes: string[]): string {
  let _scopes = '';
  for (let i = 0; i < scopes.length; i++) {
    _scopes += `${scopes[i]} `;
  }

  return _scopes.trim();
}
