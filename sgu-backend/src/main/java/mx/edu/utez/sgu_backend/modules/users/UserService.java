package mx.edu.utez.sgu_backend.modules.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // CREATE / SAVE (Guardar un nuevo usuario)
    public User save(User user) {
        return repository.save(user);
    }

    // READ ALL (Obtener todos los usuarios)
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return repository.findAll();
    }

    // READ ONE (Obtener un usuario por ID)
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    // UPDATE (Actualizar un usuario existente)
    public User update(Long id, User userDetails) {
        return repository.findById(id).map(user -> {
            user.setNombreCompleto(userDetails.getNombreCompleto());
            user.setCorreoElectronico(userDetails.getCorreoElectronico());
            user.setNumeroTelefono(userDetails.getNumeroTelefono());
            return repository.save(user);
        }).orElse(null); // Podrías manejar esto con una excepción en un proyecto real
    }

    // DELETE (Eliminar un usuario)
    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}