export const verificationEmail = ({ name, token }) => `
<div style="width: 85%; padding: 16px">
<h2 style="color: teal; margin: 10px auto 10px auto;">Doc App</h2>
<hr />
<p>Hola ${name}, te queremos dar la bienvenida a Doc-App. Para empezar a utilizar todos los servicios de Doc App por favor activa tu cuenta</p>
<br/>
<a href="http://localhost:5000/account/verification/${token}" style="margin: 10px; padding: 16px; color: #fff; background-color: teal">Click Aqui para verificar la cuenta</a>
</div>
`

export const passwordRecovery = ({ name, token }) => `
<div style="width: 85%; padding: 16px">
<h2 style="color: teal; margin: 10px auto 10px auto;">Doc App - Recuperacion de Contraseña </h2>
<hr />
<p>Hola ${name}, hemos recibido una solicitud para cambiar su contraseña, si usted no ha realizado esta solicitud por favor elimine este mensaje</p>
<br/>
<a href="http://localhost:5000/user/reset-password/${token}" style="margin: 10px; padding: 16px; color: #fff; background-color: teal">Click Aqui cambiar la contraseña</a>
</div>
`


