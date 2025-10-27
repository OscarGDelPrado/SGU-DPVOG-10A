package mx.edu.utez.sgu_backend.modules.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    // GET: Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        List<User> users = this.service.findAll();
        // Siempre devuelve 200 OK. Si no hay usuarios, devuelve una lista vacía.
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // GET: Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = this.service.findById(id);

        if (user.isPresent()) {
            response.put("message", "Usuario encontrado exitosamente.");
            response.put("data", user.get());
            return new ResponseEntity<>(response, HttpStatus.OK); // 200 OK
        } else {
            response.put("message", "Error: Usuario no encontrado con ID " + id + ".");
            response.put("data", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 NOT FOUND
        }
    }

    // POST: Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User newUser = this.service.save(user);
            response.put("message", "Usuario creado exitosamente.");
            response.put("data", newUser);
            return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 CREATED
        } catch (Exception e) {
            // Manejar errores de base de datos (ej. correo electrónico duplicado)
            response.put("message", "Error al guardar el usuario. Verifique los datos.");
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400 BAD REQUEST
        }
    }

    // PUT: Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("id") Long id, @RequestBody User userDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updatedUser = this.service.update(id, userDetails);

            if (updatedUser != null) {
                response.put("message", "Usuario actualizado exitosamente.");
                response.put("data", updatedUser);
                return new ResponseEntity<>(response, HttpStatus.OK); // 200 OK
            } else {
                response.put("message", "Error: Usuario no encontrado para actualizar con ID " + id + ".");
                response.put("data", null);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 NOT FOUND
            }
        } catch (Exception e) {
            response.put("message", "Error al actualizar el usuario. Verifique los datos.");
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400 BAD REQUEST
        }
    }

    // DELETE: Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();

        if (this.service.delete(id)) {
            response.put("message", "Usuario eliminado exitosamente.");
            // Cambiamos a 200 OK para que el cuerpo JSON sea enviado al cliente
            return new ResponseEntity<>(response, HttpStatus.OK); // <-- CAMBIO AQUÍ
        } else {
            response.put("message", "Error: No se pudo eliminar el usuario. ID " + id + " no encontrado.");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 NOT FOUND
        }
    }
}