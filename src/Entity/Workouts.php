<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\WorkoutsRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=WorkoutsRepository::class)
 * @ApiResource(
 *  subresourceOperations={ 
 *      "api_users_workouts_get_subresource"={ 
 *          "normalization_context"={"groups"={"workouts_subresource"}} 
 *      },
 *      "api_goal_workouts_get_subresource"={ 
 *          "normalization_context"={"groups"={"workouts_subresource"}} 
 *      },
 *      "api_level_workouts_get_subresource"={ 
 *          "normalization_context"={"groups"={"workouts_subresource"}} 
 *      },
 *      "api_trainingPlace_workouts_get_subresource"={ 
 *          "normalization_context"={"groups"={"workouts_subresource"}} 
 *      },
 *      "api_exercices_workouts_get_subresource"={ 
 *          "normalization_context"={"groups"={"workouts_subresource"}} 
 *      } 
 *  }, 
 *  normalizationContext={
 *      "groups"={"workouts_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true} 
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Workouts
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="workouts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"workouts_read"})
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le titre est obligatoire")
     * @Assert\Length(min=3, minMessage="Le titre doit faire plus de 3 caract??res", max=255, maxMessage="Le titre doit faire moins de 255 caract??res")

     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="La description est obligatoire")
     * @Assert\Length(min=3, minMessage="Le description doit faire plus de 3 caract??res", max=255, maxMessage="Le description doit faire moins de 255 caract??res")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     */
    private $thumbnail;

    /**
     * @ORM\ManyToOne(targetEntity=Level::class, inversedBy="workouts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le niveau doit ??tre renseign??")
     */
    private $level;

    /**
     * @ORM\ManyToOne(targetEntity=Goal::class, inversedBy="workouts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le but doit ??tre renseign??")
     */
    private $goal;

    /**
     * @ORM\ManyToOne(targetEntity=TrainingPlaces::class, inversedBy="workouts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="L'emplacement de l'entra??nement doit ??tre renseign??")
     */
    private $trainingPlace;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Les ??quipements n??cessaires doivent ??tre renseign??s")
     */
    private $equipements;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le temps moyen doit ??tre renseign?? en minute")
     * @Assert\Type(type="integer", message="Le temps moyen doit ??tre un nombre en minute !")
     */
    private $averageTime;

    /**
     * @ORM\ManyToMany(targetEntity=Exercices::class, inversedBy="listWorkouts")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     */
    private $exercices;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le nombre de s??rie doit ??tre renseign??")
     * @Assert\Type(type="integer", message="Le nombre de s??rie doit ??tre un nombre !")
     */
    private $series;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     */
    private $amountLikes = 0;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     */
    private $amountFavorites = 0;

    /**
     * @Groups({"workouts_read", "users_read", "workouts_subresource"})
     * @Assert\NotBlank(message="Le nombre de r??p??tition doit ??tre renseign??")
     * @ORM\Column(type="array")
     */
    private $nbRepetition = [];

    /**
     * @Groups({"workouts_read"})
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="likedWorkouts")
     */
    private $likedUsers;

    public function __construct()
    {
        $this->exercices = new ArrayCollection();
        $this->likedUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

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

    public function getEquipements(): ?string
    {
        return $this->equipements;
    }

    public function setEquipements(string $equipements): self
    {
        $this->equipements = $equipements;

        return $this;
    }

    public function getAverageTime(): ?int
    {
        return $this->averageTime;
    }

    public function setAverageTime($averageTime): self
    {
        $this->averageTime = $averageTime;

        return $this;
    }

    /**
     * @return Collection|Exercices[]|null
     */
    public function getExercices(): ?Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercices $exercices): self
    {
        if (!$this->exercices->contains($exercices)) {
            $this->exercices[] = $exercices;
        }

        return $this;
    }

    public function removeExercice(Exercices $exercices): self
    {
        $this->exercices->removeElement($exercices);

        return $this;
    }

    public function getSeries(): ?int
    {
        return $this->series;
    }

    public function setSeries($series): self
    {
        $this->series = $series;

        return $this;
    }

    public function getAmountLikes(): ?int
    {
        return $this->amountLikes;
    }

    public function setAmountLikes(int $amountLikes): self
    {
        $this->amountLikes = $amountLikes;

        return $this;
    }

    public function getAmountFavorites(): ?int
    {
        return $this->amountFavorites;
    }

    public function setAmountFavorites(int $amountFavorites): self
    {
        $this->amountFavorites = $amountFavorites;

        return $this;
    }

    public function getNbRepetition(): ?array
    {
        return $this->nbRepetition;
    }

    public function setNbRepetition(array $nbRepetition): self
    {
        $this->nbRepetition = $nbRepetition;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getLikedUsers(): Collection
    {
        return $this->likedUsers;
    }

    public function addLikedUser(User $likedUser): self
    {
        if (!$this->likedUsers->contains($likedUser)) {
            $this->likedUsers[] = $likedUser;
            $likedUser->addLikedWorkout($this);
        }

        return $this;
    }

    public function removeLikedUser(User $likedUser): self
    {
        if ($this->likedUsers->removeElement($likedUser)) {
            $likedUser->removeLikedWorkout($this);
        }

        return $this;
    }
}
