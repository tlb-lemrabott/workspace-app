package com.lemrabott.workspace.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class ToCall {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID toCallId;
    private String name;
    private String reason;
    private String company;
    private String Function;
    private LocalDate timeToCall;

}
