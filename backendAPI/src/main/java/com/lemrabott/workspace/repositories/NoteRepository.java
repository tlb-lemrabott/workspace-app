package com.lemrabott.workspace.repositories;

import com.lemrabott.workspace.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface NoteRepository extends JpaRepository<Note, UUID> {

}
