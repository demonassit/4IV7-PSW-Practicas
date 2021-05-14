<%-- 
    Document   : consultarEmpleados
    Created on : 14/05/2021, 04:42:16 PM
    Author     : demon
--%>

<%@page import="java.util.List"%>
<%@page import="Modelo.Empleado"%>
<%@page import="Control.AccionesEmpleado"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Tabla de Todos los Empleados</h1>
        <br>
        <table border="2" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Pais</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <% 
                List<Empleado> lista = AccionesEmpleado.buscarAllEmpleados();
                
                for(Empleado e : lista){
                    
                    %>
                    <tr>
                        <td> <%=e.getId()%> </td>
                        <td> <%=e.getNombre()%> </td>
                        <td> <%=e.getPassword()%> </td>
                        <td> <%=e.getEmail()%> </td>
                        <td> <%=e.getPais()%> </td>
                        <td> <a href="editarempleado.jsp?id=<%=e.getId()%>" >Editar</a> </td>
                        <td> <a href="borrarEmpleado?id=<%=e.getId()%>" >Borrar</a> </td>
                    </tr>    
                    <%
                
                }
                
                %>
                
            </tbody>
        </table>
        <br>
        <a href="index.html" >Regresar al Menu Principal</a>
    </body>
</html>
