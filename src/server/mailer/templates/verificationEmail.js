
const verificationMail = ({ name, token }) => `
<div style="width: 85%; padding: 16px">
<h2 style="color: teal; margin: 10px auto 10px auto;">Doc App</h2>
<hr />
<p>Hola ${name}, te queremos dar la bienvenida a Doc-App. Para empezar a utilizar todos los servicios de Doc App por favor activa tu cuenta</p>
<br/>
<a href="http://localhost:5000/account/verification/${token}" style="margin: 10px; padding: 16px; color: #fff; background-color: teal">Click Aqui para verificar la cuenta</a>
</div>
`

export default verificationMail;