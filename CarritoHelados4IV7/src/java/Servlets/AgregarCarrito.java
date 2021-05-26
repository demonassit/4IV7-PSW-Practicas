/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import Modelo.DCompra;
import Modelo.MProducto;
import Modelo.MUsuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author demon
 */
public class AgregarCarrito extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            
            HttpSession sesionusu = request.getSession();
            //detalledelacompra
            Vector<DCompra> detallecompra = null;
            Vector<MProducto> stockproducto = null;
            
            //si se creo una sesion con el atributo del detalle de la venta
            if(sesionusu.getAttribute("detallecompra") != null){
                //si hay productos en el vector
                detallecompra = (Vector<DCompra>)sesionusu.getAttribute("detallecompra");
                stockproducto = (Vector<MProducto>)sesionusu.getAttribute("stockproducto");
            }else{
                //es la primera vez
                detallecompra = new Vector<DCompra>();
                stockproducto = new Vector<MProducto>();
            }
            
            //debo de obtener el producto y la cantidad que se va a vender
            int codigo = Integer.parseInt(request.getParameter("txtCodigo").trim());
            int cantidad = Integer.parseInt(request.getParameter("txtCantidad").trim());
            
            MProducto producto = new MProducto();
            
            producto.buscarProducto(codigo);
            
            double subtotal = cantidad*producto.getPrecio_producto();
            
            //Creo el detalle de la compra
            DCompra dcompra = new DCompra();
            
            //objeto del usuario del encabezado
            MUsuario usuario = new MUsuario();
            
            dcompra.setId_dcompra(detallecompra.size()+1);
            dcompra.setId_producto(codigo);
            dcompra.setCantidad_dcompra(cantidad);
            dcompra.setSubtotal_dcompra(subtotal);
            dcompra.setId_encabezado(usuario.getId_usuario());
            
            //lo voy a agregar al detalle
            detallecompra.add(dcompra);
            
            //lo envio a la sesion
            sesionusu.setAttribute("detallecompra", detallecompra);
            
            //que paso con el stock
            
            producto.setStock_producto(producto.getStock_producto()-cantidad);
            
            stockproducto.add(producto);
            
            sesionusu.setAttribute("stockproducto", stockproducto);
            
            response.sendRedirect("MostrarCarrito.jsp");
            
            
            
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(AgregarCarrito.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(AgregarCarrito.class.getName()).log(Level.SEVERE, null, ex);
        }
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
