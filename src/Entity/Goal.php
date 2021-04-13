<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\GoalRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=GoalRepository::class)
 * @ApiResource(
 *  subresourceOperations={ 
 *      "workouts_get_subresource"={"path"="/goals/{id}/workouts"} 
 *  }, 
 *  normalizationContext={
 *      "groups"={"goal_read"}
 *  }
 * )
 */
class Goal
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"goal_read", "workouts_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"goal_read", "workouts_read", "workouts_subresource", "users_read"}) 
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="goal")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Workouts::class, mappedBy="goal")
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

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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
            $user->setGoal($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getGoal() === $this) {
                $user->setGoal(null);
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
            $workout->setGoal($this);
        }

        return $this;
    }

    public function removeWorkout(Workouts $workout): self
    {
        if ($this->workouts->removeElement($workout)) {
            // set the owning side to null (unless already changed)
            if ($workout->getGoal() === $this) {
                $workout->setGoal(null);
            }
        }

        return $this;
    }
}
