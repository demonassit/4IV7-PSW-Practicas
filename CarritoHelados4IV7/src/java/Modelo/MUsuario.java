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

public class MUsuario {
    
    /*
    id_usuario int nombre_usuario appat_usuario
    apmat_usuario fecnac_usuario tel_usuario
    cel_usuario user_usuario pass_usuario 
    id_ddireccion id_tarjeta
    
    */
    
    private int id_usuario, id_tarjeta, privilegio_usuario, id_ddireccion;
    private String nombre_usuario, appat_usuario, apmat_usuario;
    private String fecnac_usuario, tel_usuario, cel_usuario;
    private String user_usuario, pass_usuario;
    
    public MUsuario(){
    
    }
    
    /*
    metodo que se encargue de verificar si el usuario
    esta registrado en la BD, con que user y pass, 
    si privilegio == 1 -> cliente else privilegio == 0 -> admin else privilegio == 2 -> trabajador
    */
    
    public MUsuario verificarUsuario(String user, String pass) throws ClassNotFoundException{
        MUsuario u = null;
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            con = Conexion.getConnection();
            String q = "select * from MUsuario "
                    + "where user_usuario = ? AND pass_usuario = ?";
            
            ps = con.prepareStatement(q);
            
            ps.setString(1, user);
            ps.setString(2, pass);
            
            rs = ps.executeQuery();
            
            while(rs.next()){
                u = new MUsuario();
                u.setId_usuario(rs.getInt("id_usuario"));
                u.setNombre_usuario(rs.getString("nombre_usuario"));
                u.setAppat_usuario(rs.getString("appat_usuario"));
                u.setApmat_usuario(rs.getString("apmat_usuario"));
                u.setFecnac_usuario(rs.getString("fecnac_usuario"));
                u.setTel_usuario(rs.getString("tel_usuario"));
                u.setCel_usuario(rs.getString("cel_usuario"));
                u.setUser_usuario(rs.getString("user_usuario"));
                u.setPass_usuario(rs.getString("pass_usuario"));
                u.setId_ddireccion(rs.getInt("id_ddireccion"));
                u.setId_tarjeta(rs.getInt("id_tarejata"));
                u.setPrivilegio_usuario(rs.getInt("privilegio_usuario"));
                break;
                
            }
        
        }catch(SQLException sq){
            System.out.println("Error al verificar al usuario");
            System.out.println(sq.getMessage());
            u = null;
        }finally{
            try{
                rs.close();
                ps.close();
                con.close();
            }catch(Exception e){
                System.out.println("Error al desconectar la BD");
                System.out.println(e.getMessage());
            }
        }
        return u;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public int getId_tarjeta() {
        return id_tarjeta;
    }

    public void setId_tarjeta(int id_tarjeta) {
        this.id_tarjeta = id_tarjeta;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getAppat_usuario() {
        return appat_usuario;
    }

    public void setAppat_usuario(String appat_usuario) {
        this.appat_usuario = appat_usuario;
    }

    public String getApmat_usuario() {
        return apmat_usuario;
    }

    public void setApmat_usuario(String apmat_usuario) {
        this.apmat_usuario = apmat_usuario;
    }

    public String getFecnac_usuario() {
        return fecnac_usuario;
    }

    public void setFecnac_usuario(String fecnac_usuario) {
        this.fecnac_usuario = fecnac_usuario;
    }

    public String getTel_usuario() {
        return tel_usuario;
    }

    public void setTel_usuario(String tel_usuario) {
        this.tel_usuario = tel_usuario;
    }

    public String getCel_usuario() {
        return cel_usuario;
    }

    public void setCel_usuario(String cel_usuario) {
        this.cel_usuario = cel_usuario;
    }

    public String getUser_usuario() {
        return user_usuario;
    }

    public void setUser_usuario(String user_usuario) {
        this.user_usuario = user_usuario;
    }

    public String getPass_usuario() {
        return pass_usuario;
    }

    public void setPass_usuario(String pass_usuario) {
        this.pass_usuario = pass_usuario;
    }

    public int getId_ddireccion() {
        return id_ddireccion;
    }

    public void setId_ddireccion(int id_ddireccion) {
        this.id_ddireccion = id_ddireccion;
    }
    //privilegio_usuario
    
    public int getPrivilegio_usuario() {
        return privilegio_usuario;
    }

    public void setPrivilegio_usuario(int privilegio_usuario) {
        this.privilegio_usuario = privilegio_usuario;
    }
    
    
}
