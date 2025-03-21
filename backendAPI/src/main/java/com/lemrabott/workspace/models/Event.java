package com.lemrabott.workspace.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID eventId;
    private String eventName;
    private String organizerName;
    private String organizerPhone;
    private String organizerEmail;
    private String address;
    private String dateTime;
    private String description;

}
