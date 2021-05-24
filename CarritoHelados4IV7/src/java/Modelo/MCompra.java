/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author demon
 */
import Control.Conexion;
import java.sql.*;
import java.util.Vector;

public class MCompra {
    
    /*
    id_compra fecha_compra total_compra
    id_dcompra id_forma
    */
    
    private int id_compra, id_dcompra, id_forma;
    private String fecha_compra;
    private double total_compra;
    
    public MCompra(){
    
    }
    
    /*
    necesito un metodo que registre la compra, y en el momento que
    existe la compra se debe de actualizar el stock restando
    la cantidad de productos vendidos
    
    asi mismo necesito un metodo para saber cuando o cual 
    fue la ultima compra realizada para poder insertar de forma
    automatica las ventas
    */
    
    private int ultimoCodigoInsertoCompra(Connection con){
        int codigo = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            String q = "select max(id_compra) as Codigo from MCompra";
            
            ps = con.prepareStatement(q);
            
            rs = ps.executeQuery();
            while(rs.next()){
                codigo = rs.getInt("Codigo");
                break;
            }
        
        }catch(SQLException sq){
            System.out.println("Error al consultar la ultima compra");
            System.out.println(sq.getMessage());
        
        }finally{
            try{
                rs.close();
                ps.close();
            
            }catch(Exception e){
                System.out.println("Error al conectar ");
                System.out.println(e.getMessage());
            }
        }
        return codigo;
    }
    
    public boolean registrarCompra(MCompra compra, Vector<DCompra> lvc) throws ClassNotFoundException{
        boolean registro = false;
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = Conexion.getConnection();
            String q = "insert into MCompra("
                    + "fecha_compra, total_compra, id_dcompra, id_forma) "
                    + "values(?, ?, ?, ?)";
            
            ps = con.prepareStatement(q);
            
            ps.setString(1, compra.getFecha_compra());
            ps.setDouble(2, compra.getTotal_compra());
            ps.setInt(3, compra.getId_dcompra());
            ps.setInt(4, compra.getId_forma());
            
            if(ps.executeUpdate() == 1){
                int codigo = this.ultimoCodigoInsertoCompra(con);
                registro = this.registrarDetalleCompra(codigo, lvc, con);
            }else{
                registro = false;
            }
        
        }catch(SQLException sq){
            System.out.println("Error al registrar la compra");
            System.out.println(sq.getMessage());
            registro = false;
        }finally{
            try{
                ps.close();
                con.close();
            
            }catch(Exception e){
                System.out.println("Error al conectar");
                System.out.println(e.getMessage());
            }
        }
        return registro;
    }
    
    private boolean registrarDetalleCompra(int codigo, Vector<DCompra> lvc, Connection con) {
        boolean registro = false;
        PreparedStatement ps = null;
        try{
            for(DCompra dc : lvc){
                String q = "insert into DCompra values(?,?,?,?,?)";
                
                ps = con.prepareStatement(q);
                
                ps.setInt(1, codigo);
                ps.setInt(2, dc.getId_producto());
                ps.setInt(3, dc.getCantidad_dcompra());
                ps.setDouble(4, dc.getSubtotal_dcompra());
                ps.setInt(5, dc.getId_encabezado());
                
                if(ps.executeUpdate() == 1){
                    registro = true;
                }else{
                    registro = false;
                    break;
                }
            }
            
        
        }catch(SQLException sq){
            System.out.println("Error al registrar el dcompra");
            System.out.println(sq.getMessage());
            registro = false;
        }finally{
            try{
                ps.close();
                con.close();
            
            }catch(Exception e){
                System.out.println("Error al conectar");
                System.out.println(e.getMessage());
            }
        }
        return registro;
    }
    
    

    public int getId_compra() {
        return id_compra;
    }

    public void setId_compra(int id_compra) {
        this.id_compra = id_compra;
    }

    public int getId_dcompra() {
        return id_dcompra;
    }

    public void setId_dcompra(int id_dcompra) {
        this.id_dcompra = id_dcompra;
    }

    public int getId_forma() {
        return id_forma;
    }

    public void setId_forma(int id_forma) {
        this.id_forma = id_forma;
    }

    public String getFecha_compra() {
        return fecha_compra;
    }

    public void setFecha_compra(String fecha_compra) {
        this.fecha_compra = fecha_compra;
    }

    public double getTotal_compra() {
        return total_compra;
    }

    public void setTotal_compra(double total_compra) {
        this.total_compra = total_compra;
    }


    
    
    
}
