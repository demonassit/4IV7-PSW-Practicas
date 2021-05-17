/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import Control.AccionesEmpleado;
import Modelo.Empleado;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author demon
 */
public class guardarEmpleado extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
            /*
            
            Vamos a obtener la sesion de este usuario
            
            */
            
            HttpSession idsesion = request.getSession(true);
            
            //obtener los datos de la sesion
            
            String iDsesion = idsesion.getId();
            
            //fecha de creacion de la sesion
            
            long fechacreacion = idsesion.getCreationTime();
            
            //la fecha del ultimo acceso
            
            long fechaultima = idsesion.getLastAccessedTime();
            
            //vamos a guardar todos los datos de sesion en "cookie"
            
            Integer cuenta = (Integer)idsesion.getAttribute("cuenta.ss");
            
            if(cuenta == null){
                cuenta = new Integer(1);
            }else{
                cuenta = new Integer(cuenta.intValue()+1);
            }
            
            idsesion.setAttribute("cuenta.ss", cuenta);
            
            System.out.println("Sesion: "+ iDsesion);
            System.out.println("Fecha de creación: "+ new Date(fechacreacion).toString());
            System.out.println("Fecha de ultimo acceso: "+ new Date(fechaultima).toString());
            
            Enumeration nombreParametros = idsesion.getAttributeNames();
            
            while(nombreParametros.hasMoreElements()){
                String parametro = (String)nombreParametros.nextElement();
                Object valor = idsesion.getAttribute(parametro);
                System.out.println("Atributos de la sesion: " + parametro 
                        + " Valor: " + valor.toString());
            }
            
            String nom, pass, email, pais;
            
            nom = request.getParameter("nombre");
            pass = request.getParameter("password");
            email = request.getParameter("email");
            pais = request.getParameter("pais");
            
            Empleado e = new Empleado();
            
            e.setNombre(nom);
            e.setPassword(pass);
            e.setEmail(email);
            e.setPais(pais);
            
            int estatus = AccionesEmpleado.registrarEmpleado(e);
            
            if(estatus > 0){
                response.sendRedirect("registroempleados.jsp");
            }else{
                response.sendRedirect("error.jsp");
            }
            
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
