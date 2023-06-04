export function generateHtmlForPasswordChange(code: string): string {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Código de Verificação</title>
      <style>
        /* Estilos CSS... */
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Código de Verificação</h1>
        <p>Olá!</p>
        <p>Seu código de verificação é:</p>
        <div class="verification-code">${code}</div>
        <p>Utilize este código para concluir o processo de recuperação de senha.</p>
        <p>Se você não solicitou a recuperação de senha, por favor, ignore este email.</p>
      </div>
    </body>
    </html>
    `;

  return htmlTemplate;
}
