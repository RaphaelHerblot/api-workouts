<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 * @ApiResource(
 *  subresourceOperations={ 
 *      "workouts_get_subresource"={"path"="/users/{id}/workouts"} 
 *  }, 
 *  normalizationContext={
 *      "groups"={"users_read"}
 *  }
 * )
 * @UniqueEntity("email", message="Un utilisateur ayant cette adresse email existe déjà") 
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"users_read", "workouts_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="L'email doit être renseigné !")
     * @Assert\Email(message="L'adresse doit être valide")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe est obligatoire")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="Le prénom est obligatoire")
     * @Assert\Length(min=3, minMessage="Le prénom doit faire 3 caractères ou plus", max=255, maxMessage="Le prénom doit être compris entre 3 et 255 caractères")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="Le nom de famille est obligatoire")
     * @Assert\Length(min=3, minMessage="Le nom de famille doit faire 3 caractères ou plus", max=255, maxMessage="Le nom de famille doit être compris entre 3 et 255 caractères")
     */
    private $lastName;

    /**
     * @ORM\ManyToOne(targetEntity=Level::class, inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="Le niveau doit être remplis")
     */
    private $level;

    /**
     * @ORM\ManyToOne(targetEntity=Goal::class, inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="L'objectif doit être remplis")
     */
    private $goal;

    /**
     * @ORM\ManyToOne(targetEntity=TrainingPlaces::class, inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"users_read", "workouts_read"})
     * @Assert\NotBlank(message="L'endroit d'entrainement doit être remplis")
     */
    private $trainingPlace;

    /**
     * @ORM\OneToMany(targetEntity=Workouts::class, mappedBy="author", orphanRemoval=true)
     * @Groups({"users_read"})
     * @ApiSubresource
     */
    private $workouts;

    /**
     * @ORM\ManyToMany(targetEntity=Workouts::class, inversedBy="likedUsers")
     */
    private $likedWorkouts;

    public function __construct()
    {
        $this->workouts = new ArrayCollection();
        $this->likedWorkouts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getLevel(): ?Level
    {
        return $this->level;
    }

    public function setLevel(?Level $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getGoal(): ?Goal
    {
        return $this->goal;
    }

    public function setGoal(?Goal $goal): self
    {
        $this->goal = $goal;

        return $this;
    }

    public function getTrainingPlace(): ?TrainingPlaces
    {
        return $this->trainingPlace;
    }

    public function setTrainingPlace(?TrainingPlaces $trainingPlace): self
    {
        $this->trainingPlace = $trainingPlace;

        return $this;
    }

    /**
     * @return Collection|Workouts[]
     */
    public function getWorkouts(): Collection
    {
        return $this->workouts;
    }

    public function addWorkout(Workouts $workout): self
    {
        if (!$this->workouts->contains($workout)) {
            $this->workouts[] = $workout;
            $workout->setAuthor($this);
        }

        return $this;
    }

    public function removeWorkout(Workouts $workout): self
    {
        if ($this->workouts->removeElement($workout)) {
            // set the owning side to null (unless already changed)
            if ($workout->getAuthor() === $this) {
                $workout->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Workouts[]
     */
    public function getLikedWorkouts(): Collection
    {
        return $this->likedWorkouts;
    }

    public function addLikedWorkout(Workouts $likedWorkout): self
    {
        if (!$this->likedWorkouts->contains($likedWorkout)) {
            $this->likedWorkouts[] = $likedWorkout;
        }

        return $this;
    }

    public function removeLikedWorkout(Workouts $likedWorkout): self
    {
        $this->likedWorkouts->removeElement($likedWorkout);

        return $this;
    }
}
