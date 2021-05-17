<%-- 
    Document   : registroempleados
    Created on : 14/05/2021, 04:28:57 PM
    Author     : demon
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" session="true" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Registro Exitoso</h1>
        <%
            HttpSession sesionCliente = request.getSession();
            //la consulta  a bd para saber quien entro
            //verificar_usuario(String user, String pass)
            //loggin
            //Empleado e = new Empleado()
                                                   //e.
            sesionCliente.setAttribute("Usuario", "Jorge");

            %>
        <br>
        Hola : <% out.println(sesionCliente.getAttribute("Usuario")); %>
        <a href="index.html" >Regresar al Menu Principal</a>
    </body>
</html>
