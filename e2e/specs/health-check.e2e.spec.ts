

describe('Health', () => {
  test('Reservations', async () => {
    const respose =  await fetch('http://reservation:3000')
    expect(respose.ok).toBeTruthy()
});
});