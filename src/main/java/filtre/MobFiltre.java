/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package filtre;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.collect.Lists;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;




/**
 *
 * @author runsense
 */
public class MobFiltre implements Filter
{ 
   
    

    @Override
    public void init(FilterConfig filterConfig) throws ServletException 
    {
      
    }

    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException 
    {

        HttpServletResponse res=(HttpServletResponse) response;
        HttpServletRequest req=(HttpServletRequest) request;
        HttpSession session = req.getSession();
        
        String header = req.getHeader("user-agent");
        
      
       /*      UserService userService = UserServiceFactory.getUserService();

        String thisURL = req.getRequestURI();

        res.setContentType("text/html");
        if (req.getUserPrincipal() != null) {
            res.getWriter().println("<p>Hello, " +
                                     req.getUserPrincipal().getName() +
                                     "!  You can <a href=\"" +
                                     userService.createLogoutURL(thisURL) +
                                     "\">sign out</a>.</p>");
        } else {
            res.getWriter().println("<p>Please <a href=\"" +
                                     userService.createLoginURL(thisURL) +
                                     "\">sign in</a>.</p>");
        }*/

            
                //res.sendRedirect("m_entrer.re");
         

        
            chain.doFilter(request, response);
        
    }

    @Override
    public void destroy() 
    {
        try {
            super.finalize();
        } catch (Throwable ex) {
          System.out.println(ex.getMessage());
        }
    }
    
}
