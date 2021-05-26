<%-- 
    Document   : MostrarCarrito
    Created on : 26/05/2021, 04:52:19 PM
    Author     : demon
--%>

<%@page import="Modelo.DCompra"%>
<%@page import="Modelo.MProducto"%>
<%@page import="java.util.Vector"%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="true" %>

<%
    String usuario = "";
    HttpSession sesionusu = request.getSession();
    if(sesionusu.getAttribute("usuario")==null){
    %>
    
    <jsp:forward page="index.html">
        <jsp:param name="Error" value="Es obligatorio identificarse" />
    </jsp:forward>
    
    <%
    }else{
        usuario = (String)sesionusu.getAttribute("usuario");
    }
    %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <p>Bienvenido: <%out.println(usuario); %></p>
        
        <%
            
            //es ver el carrito con los productos que se han agregado
            Vector<DCompra> detallecompra = 
                    (Vector<DCompra>)sesionusu.getAttribute("detallecompra");
            Vector<MProducto> stockproducto = null;
            
            //debe de haber un boton para comprar
            %>
        
        
        <h1>Hello World!</h1>
    </body>
</html>
