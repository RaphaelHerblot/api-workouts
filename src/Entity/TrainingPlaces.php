<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TrainingPlacesRepository;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TrainingPlacesRepository::class)
 * @ApiResource(
 *  subresourceOperations={ 
 *      "workouts_get_subresource"={"path"="/training_places/{id}/workouts"} 
 *  },
 *  normalizationContext={
 *      "groups"={"training_place_read"}
 *  }
 * )
 */
class TrainingPlaces
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"training_place_read"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"training_place_read", "workouts_read", "workouts_subresource"}) 
     */
    private $place;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="trainingPlace")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Workouts::class, mappedBy="trainingPlace")
     * @ApiSubresource
     */
    private $workouts;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->workouts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlace(): ?string
    {
        return $this->place;
    }

    public function setPlace(string $place): self
    {
        $this->place = $place;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setTrainingPlace($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getTrainingPlace() === $this) {
                $user->setTrainingPlace(null);
            }
        }

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
            $workout->setTrainingPlace($this);
        }

        return $this;
    }

    public function removeWorkout(Workouts $workout): self
    {
        if ($this->workouts->removeElement($workout)) {
            // set the owning side to null (unless already changed)
            if ($workout->getTrainingPlace() === $this) {
                $workout->setTrainingPlace(null);
            }
        }

        return $this;
    }
}
