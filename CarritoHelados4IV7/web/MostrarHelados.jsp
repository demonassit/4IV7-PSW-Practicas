<%-- 
    Document   : MostrarHelados
    Created on : 26/05/2021, 04:19:07 PM
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
        <br>
        <br>
        <h1>cerrar sesion</h1>
        
        <%
            //ustedes van a hacer la tabla de los productos
            //ya que aqui se deben de mostrar para poderlos comprar
            Vector<MProducto> vectorproductos = new MProducto().listaProductos();
            
            //recorrer ese vector
            for(MProducto productos : vectorproductos){
                //se imprime el cuerpo de la tabla
                //debo de poder elegir un producto y añadirlo al carrito
            }
            

            
            %>
        
        
        <h1>Hello World!</h1>
    </body>
</html>
