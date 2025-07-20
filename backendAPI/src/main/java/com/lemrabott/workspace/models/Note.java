package com.lemrabott.workspace.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID noteId;
    private String subject;
    @Lob
    private String content;
    private LocalDate creation_date;

}
