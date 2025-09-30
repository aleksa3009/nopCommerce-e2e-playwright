export function uniqueUser() {
    const id = Date.now(); // dovoljno za jedinstvenost
    return {
      firstName: 'Aleksa',
      lastName: 'Aleksic',
      email: `aleksatest+${id}@example.com`,
      password: 'Aa!2345678'
    };
}