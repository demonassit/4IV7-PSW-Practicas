<%-- 
    Document   : registrar
    Created on : 30/04/2021, 04:14:21 PM
    Author     : demon
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" language="java" import="java.sql.*, java.util.*, java.text.*" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Registro de Usuarios</title>
    </head>
    <body>
        <% 
            //aqui va codigo java
            Connection con = null;
            Statement set = null;
            ResultSet rs = null;
            
            String url, userName, password, driver;
            
            url = "jdbc:mysql://localhost/registrousuarios";
            userName = "root";
            password = "n0m3l0";
            driver = "com.mysql.jdbc.Driver";
            //voy a lanzar una vista para cuando hace la insercion, cuando 
            //hay error en la lectura de la tabla
            //hay error por parte de bd
            
            try{
                Class.forName(driver);
                con = DriverManager.getConnection(url, userName, password);
                
                try{
                    String nombre, ciudad, tel, q;
                    nombre = request.getParameter("nombre");
                    ciudad = request.getParameter("ciudad");
                    tel = request.getParameter("tel");
                    
                    set = con.createStatement();
                    
                    q = "insert into registro(nom_usu, ciu_usu, tel_usu) "
                            + "values ('"+nombre+"', '"+ciudad+"', '"+tel+"')";
                    int registro = set.executeUpdate(q);
                    
                    %>
        <h1>Registro Exitoso</h1>            
                    <%
                        set.close();
                
                }catch(SQLException ed){
                    System.out.println("Error al registrar en la tabla");
                    System.out.println(ed.getMessage());
                    %>
        <h1>Registro No Exitoso, error en la lectura de la tabla</h1>            
                    <%
                
                }
                con.close();
            
            }catch(Exception e){
                System.out.println("Error al conectar la bd");
                System.out.println(e.getMessage());
                System.out.println(e.getStackTrace());
            %>
        <h1>Sitio en Construcción</h1>            
                    <%
            }
            %>
        
        
            <a href="index.html" >Regresar al menú principal</a>
        
    </body>
</html>
